/**
 * Script för att skapa blogginlägg i batch
 * Skapar inlägg i AITable och genererar bilder
 *
 * Kör: node scripts/create-posts-batch.js
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { generateImagePrompt, generateImageWithOpenRouter } from '../lib/image-prompt.js';
import { createRecord, getRecords, updateRecords } from '../lib/aitable.js';

const BLOG_DATASHEET_ID = process.env.AITABLE_FLEXRA_BLOG_ID;
const API_KEY = process.env.POSTS_API_KEY;
const BASE_URL = 'http://localhost:3000';

// Posts #6-15 att skapa
const postsToCreate = [
  {
    title: "Konsten att skriva bättre prompts för ChatGPT",
    date: "14 feb 2023",
    category: "Guider",
    categoryColor: "bg-lime-100",
    description: "Lär dig formulera prompts som ger dig bättre svar och sparar tid i ditt dagliga arbete med AI.",
    content: `Har du någonsin känt dig frustrerad över att ChatGPT inte förstår vad du egentligen vill ha? Du är inte ensam. Efter hundratals timmar med AI-assistenter har jag lärt mig att det inte handlar om verktygets begränsningar, utan om hur vi kommunicerar med det.

## Varför prompts spelar roll

Tänk på det så här: om du frågar en ny kollega "kan du hjälpa mig med det där projektet?" får du troligen en förvirrad blick tillbaka. Men om du säger "kan du sammanställa försäljningssiffrorna för Q4 i ett Excel-ark med kolumner för produkt, region och intäkt?" får du exakt vad du behöver.

Samma princip gäller för AI. Ju tydligare du är, desto bättre resultat.

## Tre grundprinciper för effektiva prompts

### 1. Var specifik med kontexten

Istället för: "Skriv ett mail"
Prova: "Skriv ett professionellt mail till en kund som beställt en produkt som är försenad med 3 dagar. Tonen ska vara ursäktande men lösningsorienterad. Max 150 ord."

### 2. Definiera formatet

Berätta hur du vill ha svaret strukturerat:
- Punktlista eller löpande text?
- Hur långt?
- Vilken ton (formell, casual, teknisk)?

### 3. Ge exempel

Om du vill ha en viss stil, visa ett exempel. "Skriv i samma stil som detta: [exempel]" fungerar förvånansvärt bra.

## Praktiska promptmallar

Här är några mallar jag använder dagligen:

**För sammanfattningar:**
"Sammanfatta följande text i 3-5 punkter. Fokusera på [specifikt område]. Texten: [klistra in]"

**För brainstorming:**
"Ge mig 10 idéer för [ämne]. Jag jobbar inom [bransch] och målgruppen är [beskrivning]. Inkludera både säkra och mer kreativa förslag."

**För problemlösning:**
"Jag har följande problem: [beskriv]. Jag har redan provat [lösningar]. Vad mer kan jag testa? Ge konkreta steg."

## Vanliga misstag att undvika

1. **För vaga instruktioner** - "Gör det bättre" säger ingenting
2. **Anta förkunskap** - Ge alltid nödvändig bakgrund
3. **Hoppa över iteration** - Första svaret är sällan perfekt, bygg vidare på det

## Slutsats

Bra prompts handlar inte om magi eller hemliga formler. Det handlar om tydlig kommunikation. Behandla AI som en kompetent men nyinställd medarbetare som behöver tydliga instruktioner.

Börja med en av mallarna ovan och anpassa efter dina behov. Du kommer märka skillnad direkt.`,
    keywords: "prompts, ChatGPT, AI-kommunikation, prompt engineering, AI-tips"
  },
  {
    title: "GPT-4 är här - detta behöver du veta som företagare",
    date: "8 mar 2023",
    category: "Nyheter",
    categoryColor: "bg-yellow-100",
    description: "OpenAI släpper GPT-4 med förbättrad förståelse och nya möjligheter. Så påverkar det svenska företag.",
    content: `OpenAI har just lanserat GPT-4, och jag har tillbringat de senaste dagarna med att testa det. Kort sagt: skillnaden är märkbar, särskilt för affärsanvändning.

## Vad är nytt i GPT-4?

Den största förändringen är inte hastigheten eller längden på svaren. Det är förståelsen. GPT-4 greppar nyanser, kontext och komplexa instruktioner på ett sätt som GPT-3.5 inte klarade.

### Konkreta förbättringar

- **Längre minne**: Kan hålla koll på längre konversationer och dokument
- **Färre hallucinationer**: Hittar på mindre saker (men är inte perfekt)
- **Bättre resonemang**: Kan lösa problem i flera steg
- **Multimodalt**: Kan nu även analysera bilder (kommer snart till ChatGPT)

## Vad betyder detta för företag?

### 1. Mer pålitlig för affärsdokument

Med GPT-4 kan du be om hjälp med avtal, rapporter och presentationer med högre förtroende för resultatet. Den förstår affärskontext bättre.

### 2. Effektivare kodgenerering

För er som använder AI för utveckling: GPT-4 skriver bättre kod med färre buggar. Den förstår också befintlig kodbas bättre när du ber om ändringar.

### 3. Förbättrad analys

Ladda upp en rapport och be om en sammanfattning. GPT-4 plockar ut de relevanta delarna med imponerande precision.

## Är det värt uppgraderingen?

ChatGPT Plus kostar 20 dollar per månad och ger tillgång till GPT-4. För de flesta företagsanvändare är svaret ja, det är värt det.

Men kom ihåg: verktyget är fortfarande ett komplement. Dubbelkolla alltid fakta och siffror.

## Praktiska tips för att komma igång

1. **Börja med nuvarande arbetsuppgifter** - Testa GPT-4 på saker du redan gör
2. **Jämför resultat** - Kör samma prompt i GPT-3.5 och GPT-4
3. **Experimentera med längre instruktioner** - GPT-4 hanterar komplexa prompts bättre

## Sammanfattning

GPT-4 är ett stort steg framåt, särskilt för professionell användning. Det är inte perfekt, men det är tillräckligt bra för att förändra hur många av oss arbetar. Om du funderat på att integrera AI i ditt arbetsflöde är nu ett bra tillfälle att börja.`,
    keywords: "GPT-4, OpenAI, AI-nyheter, ChatGPT Plus, AI för företag"
  },
  {
    title: "5 AI-verktyg som sparar dig timmar varje vecka",
    date: "22 mar 2023",
    category: "Guider",
    categoryColor: "bg-lime-100",
    description: "Praktiska AI-verktyg för vardagen som faktiskt levererar tidsbesparing utan krånglig setup.",
    content: `Jag ska vara ärlig: de flesta AI-verktyg jag testat har hamnat i den digitala soptunnan. Men några har blivit oumbärliga. Här är de fem som faktiskt sparar mig tid varje vecka.

## 1. Otter.ai - Mötesanteckningar på autopilot

**Vad det gör:** Transkriberar möten i realtid och skapar automatiska sammanfattningar.

**Varför jag använder det:** Istället för att anteckna under möten kan jag fokusera på samtalet. Efter mötet får jag en sökbar transkribering plus action items.

**Tidsbesparing:** Cirka 2-3 timmar per vecka

**Kostnad:** Gratis för 300 minuter/månad, sedan från 99 kr/månad

## 2. Notion AI - Skrivassistent integrerad i arbetsflödet

**Vad det gör:** AI-funktioner direkt i Notion för att sammanfatta, skriva om och generera innehåll.

**Varför jag använder det:** Jag har redan allt i Notion. Att kunna fråga AI om mina egna anteckningar är ovärderligt.

**Tidsbesparing:** 1-2 timmar per vecka

**Kostnad:** 10 dollar per månad (tillägg till Notion)

## 3. Grammarly - Mer än stavningskontroll

**Vad det gör:** Kontrollerar grammatik, ton och klarhet på engelska texter.

**Varför jag använder det:** För all extern kommunikation på engelska. Det fångar inte bara fel utan föreslår bättre formuleringar.

**Tidsbesparing:** 1 timme per vecka (plus bättre kvalitet)

**Kostnad:** Gratis grundversion, Premium från 120 kr/månad

## 4. Runway - Videoredigering för icke-proffs

**Vad det gör:** AI-drivna videoredigeringsverktyg som tar bort bakgrunder, genererar undertexter och mer.

**Varför jag använder det:** För korta marknadsföringsvideor behöver jag inte längre skicka till en byrå.

**Tidsbesparing:** 4-5 timmar per videoprojekt

**Kostnad:** Gratis att testa, sedan från 12 dollar/månad

## 5. ChatGPT med anpassade instruktioner

**Vad det gör:** AI-assistent som minns dina preferenser och arbetskontext.

**Varför jag använder det:** Med rätt anpassade instruktioner behöver jag inte förklara min roll och kontext varje gång.

**Tidsbesparing:** 2-3 timmar per vecka

**Kostnad:** Gratis eller 20 dollar/månad för GPT-4

## Hur du väljer rätt verktyg

Innan du tecknar ännu ett abonnemang, ställ dig dessa frågor:

1. **Löser det ett verkligt problem?** Inte ett problem du tror att du har
2. **Passar det i ditt befintliga arbetsflöde?** Nya verktyg som kräver stora omställningar används sällan
3. **Är tidsbesparingen större än inlärningskurvan?** Ibland är det enklare att fortsätta som förut

## Slutsats

Fem verktyg, ungefär 10-15 timmar sparade per vecka. Inte illa. Men det viktigaste är inte antalet verktyg, utan att hitta de som passar just ditt sätt att arbeta.

Börja med ett. Ge det två veckor. Utvärdera sedan innan du lägger till nästa.`,
    keywords: "AI-verktyg, produktivitet, Otter.ai, Notion AI, Grammarly, tidsbesparing"
  },
  {
    title: "Automatisera din fakturering med AI-stöd",
    date: "8 apr 2023",
    category: "Guider",
    categoryColor: "bg-lime-100",
    description: "Steg-för-steg guide för att automatisera fakturahantering och spara administrativ tid.",
    content: `Fakturering. Det låter inte sexigt, men det är en av de processer där automation ger störst effekt snabbast. Jag har hjälpt ett tiotal småföretag att automatisera sin fakturahantering det senaste året. Här är vad jag lärt mig.

## Varför fakturering är perfekt för automation

Fakturering har tre egenskaper som gör det idealiskt att automatisera:

1. **Repetitivt** - Samma typ av uppgift, om och om igen
2. **Regelbaserat** - Tydliga regler för vad som ska hända när
3. **Tidskrävande** - Liten investering ger stor tidsbesparing

## Steg 1: Kartlägg din nuvarande process

Innan du automatiserar, förstå vad du gör idag:

- Hur skapas fakturor? (manuellt, från offerter, från tidrapporter?)
- Hur skickas de? (mail, post, e-faktura?)
- Hur följer du upp obetalda fakturor?
- Hur hanterar du bokföringen?

Skriv ner varje steg. Mät hur lång tid varje moment tar.

## Steg 2: Välj rätt verktyg

För svenska företag rekommenderar jag:

**Fortnox** - Marknadsledande för småföretag. Bra integrationer.

**Visma eEkonomi** - Kraftfullt för företag som växer.

**Bokio** - Enklast att komma igång med. Gratis grundversion.

Alla tre har API:er som möjliggör kopplingar till andra system.

## Steg 3: Automatisera skapandet av fakturor

**Från tidrapporter:**
Koppla ditt tidrapporteringssystem (Harvest, Clockify, etc.) till ditt ekonomisystem. Fakturor skapas automatiskt baserat på loggad tid.

**Från återkommande tjänster:**
Sätt upp automatiska fakturor för abonnemang och månatliga tjänster.

**Från CRM:**
När en affär stängs i ditt CRM, trigga skapandet av en faktura.

## Steg 4: Automatisera utskick

De flesta ekonomisystem kan skicka fakturor automatiskt via:
- E-post (vanligast)
- E-faktura (växer snabbt)
- PDF via post (för kunder som kräver det)

Sätt upp regler: ny faktura → skickas automatiskt → bekräftelsemail till dig.

## Steg 5: Automatisera påminnelser

Här finns stor tidsbesparing:

1. **Dag 5 efter förfall** - Vänlig påminnelse via mail
2. **Dag 14 efter förfall** - Påminnelse #2 med påminnelseavgift
3. **Dag 30 efter förfall** - Varning om inkasso

Låt systemet hantera detta. Du behöver bara agera på undantag.

## Steg 6: Koppla till bokföringen

Modern programvara kan:
- Automatiskt bokföra skickade fakturor
- Matcha inbetalningar mot fakturor
- Flagga avvikelser för manuell hantering

## Verklig tidsbesparing

Ett typiskt småföretag med 50 fakturor per månad kan spara:

| Uppgift | Före | Efter |
|---------|------|-------|
| Skapa fakturor | 4 tim | 30 min |
| Skicka fakturor | 2 tim | 0 min |
| Påminnelser | 2 tim | 15 min |
| Avstämning | 3 tim | 30 min |
| **Totalt** | **11 tim** | **1,25 tim** |

Det är nästan 10 timmar sparade. Varje månad.

## Kom igång idag

1. Välj ett ekonomisystem om du inte redan har ett
2. Sätt upp automatiska utskick
3. Konfigurera påminnelseflödet
4. Koppla till bankintegration

Du behöver inte automatisera allt på en gång. Börja med det som tar mest tid idag.`,
    keywords: "fakturering, automation, Fortnox, Visma, bokföring, småföretag"
  },
  {
    title: "AI inom marknadsföring: Möjligheter och fallgropar",
    date: "25 apr 2023",
    category: "Insikter",
    categoryColor: "bg-pink-100",
    description: "En ärlig genomgång av hur AI förändrar marknadsföring och var det fortfarande fallerar.",
    content: `AI kommer revolutionera marknadsföring! säger alla. Men verkligheten är mer nyanserad. Efter ett år av att testa AI-verktyg för marknadsföring har jag sett både imponerande resultat och spektakulära misslyckanden.

## Var AI faktiskt levererar

### Innehållsproduktion (med förbehåll)

AI kan hjälpa dig producera mer innehåll snabbare. Men "mer" är inte alltid "bättre".

**Fungerar bra för:**
- Första utkast till blogginlägg
- Produktbeskrivningar i bulk
- Sociala medie-inlägg (med mänsklig redigering)
- E-postkampanjer (A/B-testvarianter)

**Fungerar dåligt för:**
- Tankeledarskapscontent
- Varumärkesberättelser
- Kreativa kampanjer som ska sticka ut

### Personalisering

Här lyser AI. Att anpassa meddelanden baserat på beteendedata i realtid är något människor helt enkelt inte kan göra manuellt.

**Exempel:** Dynamiska e-postämnesrader baserat på tidigare köp. Vi såg 23% högre öppningsgrad hos en kund som implementerade detta.

### Dataanalys

Att hitta mönster i stora datamängder är AIs styrka. Marknadsförare som använder AI för analys fattar bättre beslut snabbare.

## Var AI fortfarande fallerar

### Varumärkesröst

AI kan imitera en stil, men att verkligen förstå och konsekvent leverera en varumärkesröst? Inte ännu. Det kräver kulturell förståelse och intuition.

### Strategiskt tänkande

AI kan optimera taktiker men förstår inte affärsstrategi. Den vet inte att din VD vill undvika kontroverser eller att ni nyligen förlorat en viktig kund.

### Kreativitet som berör

De bästa marknadsföringskampanjerna skapar emotionell resonans. AI kan generera variationer, men de originella idéerna kommer fortfarande från människor.

## Tre fallgropar att undvika

### 1. AI-genererat spam

Bara för att du KAN producera 100 blogginlägg per vecka betyder det inte att du BÖR. Google och läsare ser igenom tunt innehåll.

### 2. Förlita dig på AI för fakta

AI hallucinerar. Jag har sett AI påstå saker om företag som är helt fel. Faktakolla alltid.

### 3. Glömma den mänskliga touchen

De mest framgångsrika marknadsförarna använder AI som förstärkning, inte ersättning. Dina kunder vill fortfarande känna att de pratar med människor.

## Min rekommendation

Tänk på AI som en junior medarbetare med otrolig kapacitet men bristande omdöme. Ge tydliga instruktioner. Granska allt. Använd AI för att göra mer av det som fungerar, inte för att ersätta strategiskt tänkande.

## Konkreta nästa steg

1. **Välj ett användningsfall** - t.ex. sociala medier eller e-post
2. **Testa i liten skala** - 30 dagar med mätbara mål
3. **Jämför med manuellt arbete** - Är kvaliteten jämförbar? Är tidsbesparingen värd det?
4. **Iterera** - Justera baserat på resultat

AI är här för att stanna inom marknadsföring. Men det ersätter inte marknadsförare. Det förändrar vad vi gör med vår tid.`,
    keywords: "AI marknadsföring, content marketing, personalisering, marknadsföringsverktyg"
  },
  {
    title: "Chatbots för kundtjänst - är det värt investeringen?",
    date: "15 maj 2023",
    category: "Insikter",
    categoryColor: "bg-pink-100",
    description: "En ärlig analys av när chatbots fungerar och när de skapar mer problem än de löser.",
    content: `"Vi behöver en chatbot" är något jag hör från nästan varje företag jag pratar med. Men efter att ha implementerat chatbots för ett dussin företag har jag lärt mig att svaret sällan är så enkelt.

## När chatbots faktiskt fungerar

### Höga volymer av enkla frågor

Om du får hundratals förfrågningar per dag om öppettider, leveransstatus eller returpolicy är en chatbot ett no-brainer. Den hanterar 80% av frågorna utan mänsklig inblandning.

### 24/7 tillgänglighet

För företag med internationella kunder eller kunder som förväntar sig svar utanför kontorstid fyller chatbots ett verkligt behov.

### Första triage

Att samla in information innan en mänsklig agent tar över sparar tid för alla. "Vad gäller ditt ärende?" + "Kan du ange ordernummer?" kan automatiseras.

## När chatbots skapar problem

### Komplexa eller känsliga ärenden

Kunder som är arga eller har komplicerade problem blir mer frustrerade av att prata med en bot. "Jag förstår inte, vänligen omformulera" är inte vad någon vill höra när de är upprörda.

### Låga volymer

Om du får 10 kundförfrågningar per dag är kostnaden för att implementera och underhålla en chatbot sällan motiverad.

### Bristande underhåll

En chatbot som inte uppdateras blir snabbt irrelevant. Nya produkter, ändrade policyer, säsongsfrågor - allt kräver uppdatering.

## Kostnaden folk glömmer

Implementeringskostnaden är bara början. Räkna med:

- **Innehållsskapande** - Alla frågor och svar måste skrivas
- **Träning** - Boten behöver tränas på dina specifika termer
- **Löpande underhåll** - Minst 2-4 timmar per vecka
- **Eskaleringshantering** - Process för när boten inte klarar av ärendet
- **Analys och förbättring** - Genomgång av missade frågor

Total ägandekostnad första året: 50 000 - 300 000 kr beroende på komplexitet.

## Räkna på ROI

**Positiv ROI om:**
- Minskning av ärenden till mänskliga agenter med 30%+
- Kundnöjdhet förblir stabil eller ökar
- Tidsbesparingen överstiger underhållskostnaden

**Negativ ROI om:**
- Kunder väljer bort kanalen
- Eskaleringen ökar istället för minskar
- Underhållet tar mer tid än planerat

## Alternativ att överväga

Innan du investerar i en chatbot, överväg:

1. **Bättre FAQ-sida** - Ofta underskattat, alltid tillgängligt
2. **Automatiska mailsvar** - "Vi har mottagit ditt ärende och återkommer inom 24h"
3. **Självbetjäningsportal** - Låt kunder lösa problem själva
4. **Utökade öppettider** - Ibland är fler mänskliga agenter bättre

## Min rekommendation

Börja inte med en chatbot. Börja med att analysera dina kundförfrågningar:

1. Kategorisera alla ärenden under en månad
2. Identifiera de som är repetitiva OCH enkla
3. Beräkna potentiell besparing
4. Jämför med total ägandekostnad
5. Fatta ett informerat beslut

En chatbot kan vara rätt investering. Men för många företag är enklare lösningar mer kostnadseffektiva.`,
    keywords: "chatbot, kundtjänst, kundsupport, automation, ROI"
  },
  {
    title: "AI-etik: Vad varje företagsledare måste tänka på",
    date: "5 jun 2023",
    category: "Insikter",
    categoryColor: "bg-pink-100",
    description: "Praktiska riktlinjer för ansvarsfull AI-användning i din organisation.",
    content: `"Vi använder AI" har blivit ett säljargument. Men få företag har tänkt igenom de etiska implikationerna. Det behöver inte vara komplicerat, men det kräver medveten reflektion.

## Varför detta är viktigt nu

AI-system fattar beslut som påverkar människor: vem som får ett lån, vilka CV:n som granskas, hur kunder bemöts. Med den makten kommer ansvar.

Dessutom: EU:s AI Act kommer snart att ställa lagkrav på hur företag använder AI. Att börja tänka på detta nu är inte bara etiskt rätt, det är affärsmässigt smart.

## Fem frågor att ställa

### 1. Vilken data tränar vi på?

Om din AI tränats på historisk data kan den reproducera historiska fördomar. Rekryteringsalgoritmer som tränats på tidigare anställningsbeslut kan diskriminera mot grupper som tidigare varit underrepresenterade.

**Att göra:** Granska din träningsdata. Finns det skevheter? Hur kan du kompensera?

### 2. Vem påverkas av besluten?

Kartlägg vilka som påverkas av AI-drivna beslut i din organisation. Är det anställda, kunder, leverantörer? Vilka konsekvenser har felaktiga beslut?

**Att göra:** Skapa en lista över alla AI-användningsområden och deras påverkan på människor.

### 3. Kan vi förklara besluten?

Om en kund frågar varför de nekades kredit, kan du förklara? Om en kandidat undrar varför de inte kallades till intervju? Vissa AI-modeller är "svarta lådor" där beslut inte går att spåra.

**Att göra:** Prioritera transparenta modeller för beslut som påverkar individer direkt.

### 4. Vem har tillsyn?

AI-system behöver mänsklig tillsyn. Vem i din organisation övervakar AI-beslut? Hur ofta granskas resultaten?

**Att göra:** Utse en ansvarig person. Sätt upp regelbundna granskningar.

### 5. Vad händer när det går fel?

Alla system gör misstag. Hur hanterar ni felaktiga AI-beslut? Finns det en process för att korrigera och kompensera?

**Att göra:** Dokumentera en process för klagomål och korrigeringar.

## Praktiska riktlinjer

### Var transparent

Berätta för kunder och anställda när AI används i beslut som påverkar dem. Du behöver inte avslöja algoritmer, men erkänn att AI är inblandat.

### Behåll mänsklig kontroll

För beslut med stor påverkan, se till att en människa alltid granskar innan slutgiltigt beslut fattas.

### Testa för bias

Analysera regelbundet resultaten. Behandlas olika grupper olika? Om ja, varför?

### Dokumentera

Håll koll på vilka AI-system ni använder, vad de gör och vilka beslut de påverkar. Du kommer behöva detta för framtida compliance.

## Börja enkelt

Du behöver inte en 50-sidig policy. Börja med:

1. Lista alla AI-verktyg ni använder
2. Kategorisera efter risknivå (hög/medium/låg påverkan på människor)
3. Granska högriskområdena först
4. Dokumentera era principer (kan vara en A4-sida)

## Slutsats

AI-etik handlar inte om att bromsa innovation. Det handlar om att innovera ansvarsfullt. Företag som tar detta seriöst bygger förtroende hos kunder, anställda och samhället i stort.

Börja samtalet i din organisation idag. Det behöver inte vara perfekt från start, men det behöver börja.`,
    keywords: "AI-etik, ansvarsfull AI, bias, EU AI Act, företagsetik"
  },
  {
    title: "Semesterläsning: 5 böcker om AI som förändrar ditt perspektiv",
    date: "10 jul 2023",
    category: "Insikter",
    categoryColor: "bg-pink-100",
    description: "Handplockade boktips som ger dig nya insikter om AI utan att vara för tekniska.",
    content: `Sommaren är perfekt för att ta ett steg tillbaka och tänka större tankar. Här är fem böcker som format mitt sätt att tänka på AI och dess roll i samhället och affärsvärlden.

## 1. "The Alignment Problem" av Brian Christian

**Vad den handlar om:** Varför det är så svårt att få AI att göra vad vi egentligen vill.

**Varför du ska läsa den:** Christian förklarar tekniska koncept genom fascinerande berättelser. Du kommer förstå varför AI-säkerhet är en genuin utmaning, inte bara dystopisk sci-fi.

**Bäst för:** Dig som vill förstå AI-risker utan att drunkna i teknik.

**Citat att minnas:** "The problem isn't that AI will become malevolent. The problem is that we can't specify what we want."

## 2. "Prediction Machines" av Ajay Agrawal m.fl.

**Vad den handlar om:** Ett ekonomiskt ramverk för att förstå AI som "billig prediktion".

**Varför du ska läsa den:** Skär igenom hajpen och förklarar AI i termer varje affärsperson förstår. Hjälper dig identifiera var AI kan skapa värde i din organisation.

**Bäst för:** Företagsledare som vill fatta kloka AI-investeringar.

**Insikt:** När något blir billigare (prediktion) blir komplement dyrare (mänskligt omdöme, data).

## 3. "Human Compatible" av Stuart Russell

**Vad den handlar om:** Hur vi bygger AI-system som är säkra och användbara för människor.

**Varför du ska läsa den:** Russell är en av AI-forskningens stora namn. Han tar sina egna farhågor på allvar utan att bli alarmistisk.

**Bäst för:** Dig som vill tänka långsiktigt om AI:s utveckling.

**Tankeväckande:** Russell föreslår att AI ska vara "osäker" på mänskliga preferenser, för att alltid fråga snarare än anta.

## 4. "Atlas of AI" av Kate Crawford

**Vad den handlar om:** AI:s dolda kostnader: resurser, arbetskraft, miljö.

**Varför du ska läsa den:** En nödvändig motvikt till tech-optimism. Visar att AI inte är immateriellt utan kräver enorma fysiska resurser.

**Bäst för:** Dig som vill ha ett kritiskt perspektiv.

**Ögonöppnare:** Träningen av GPT-3 krävde energi motsvarande en bils livslånga utsläpp.

## 5. "Co-Intelligence" av Ethan Mollick

**Vad den handlar om:** Praktiska strategier för att arbeta med AI som kollega snarare än verktyg.

**Varför du ska läsa den:** Mollick är professor vid Wharton och har testat AI i sin undervisning. Boken är full av konkreta tillämpningar.

**Bäst för:** Dig som vill bli bättre på att använda AI i vardagen.

**Praktiskt tips:** Mollick förespråkar att ge AI en "persona" för bättre resultat.

## Hur jag läser dessa böcker

Jag läser inte för att memorera fakta. Jag letar efter:

1. **Ramverk** - Nya sätt att tänka på problem
2. **Frågor** - Vad har jag missat?
3. **Motargument** - Vad skulle kunna vara fel?

Ta anteckningar. Diskutera med andra. Låt tankarna mogna.

## Bonus: Podcasts för resan

Om du föredrar att lyssna:

- **Lex Fridman Podcast** - Djupgående AI-intervjuer
- **Hard Fork** - Veckans AI-nyheter, lättsamt
- **Practical AI** - Fokus på tillämpningar

## Slutord

AI förändrar världen. Att förstå förändringen kräver mer än att läsa nyhetsartiklar. Ta tid att gå på djupet. Din sommarläsning kan forma hur du tänker om AI de kommande åren.

Vilken bok börjar du med?`,
    keywords: "AI-böcker, boktips, sommarläsning, AI-kunskap, utbildning"
  },
  {
    title: "Så förbereder du ditt team för AI-transformation",
    date: "1 aug 2023",
    category: "Guider",
    categoryColor: "bg-lime-100",
    description: "Steg-för-steg för att ta med ditt team på AI-resan utan motstånd och rädsla.",
    content: `Den största utmaningen med AI är inte tekniken. Det är människorna. Jag har sett projekt misslyckas inte för att verktygen inte fungerade, utan för att teamet inte var redo.

## Varför förändring är svårt

Låt oss vara ärliga: AI väcker oro. "Kommer jag förlora jobbet?" är en tanke de flesta har, även om de inte säger det högt.

Din uppgift som ledare är att adressera den oron samtidigt som du driver förändring framåt.

## Fas 1: Förberedelse (vecka 1-2)

### Förstå nuläget

Innan du introducerar något, kartlägg:

- Vilka uppgifter är mest tidskrävande?
- Var finns frustration i arbetsflödet?
- Vilka i teamet är teknikintresserade?
- Vilka är skeptiska?

### Definiera syftet

"Vi ska börja använda AI" är inte ett syfte. Bättre:

- "Vi ska minska tiden för rapportering med 50%"
- "Vi ska kunna hantera 20% fler kundärenden utan mer personal"

Tydliga mål skapar tydlighet om vad som förändras och vad som inte gör det.

## Fas 2: Kommunikation (vecka 2-4)

### Var transparent

Berätta öppet om planerna. Inkludera:

- Varför ni gör detta
- Vad som kommer förändras
- Vad som INTE kommer förändras
- Hur det påverkar varje roll

### Adressera elefanten i rummet

Prata om oro för jobben. Om AI kommer ersätta vissa uppgifter, var ärlig om det. Men betona också vilka nya möjligheter som öppnas.

### Involvera teamet

Be om input. Vilka problem vill de lösa? Vilka verktyg har de hört talas om? Delaktighet skapar engagemang.

## Fas 3: Utbildning (vecka 4-8)

### Börja med grunderna

Inte alla förstår vad AI egentligen är. En enkel workshop som förklarar koncept och visar möjligheter skapar gemensam grund.

### Hands-on träning

Låt alla testa. ChatGPT är en bra start. Ge uppgifter relaterade till deras faktiska arbete.

### Hitta ambassadörer

Identifiera de som "fattar det" snabbt. Ge dem extra ansvar att hjälpa kollegor.

## Fas 4: Pilotprojekt (vecka 8-12)

### Välj rätt projekt

Ett bra pilotprojekt är:

- Avgränsat (inte för komplext)
- Mätbart (tydlig före/efter)
- Synligt (andra ser resultaten)

### Acceptera misslyckanden

Allt kommer inte fungera perfekt. Det är okej. Dokumentera lärdomar och justera.

### Fira tidiga vinster

När något fungerar, fira det. Dela framgångar brett. Momentum är viktigt.

## Fas 5: Skalning (vecka 12+)

### Expandera gradvis

Från pilot till bredare användning. En avdelning i taget, inte alla samtidigt.

### Skapa supportstrukturer

Vem hjälper när något inte fungerar? Dokumentation? Intern expertgrupp?

### Kontinuerlig feedback

Regelbundna avstämningar. Vad fungerar? Vad behöver justeras?

## Vanliga misstag att undvika

1. **Gå för fort fram** - Förändring tar tid
2. **Ignorera motstånd** - Adressera oro, undertryck den inte
3. **Undervärdera träning** - Verktyg utan utbildning skapar frustration
4. **Missa uppföljningen** - Implementering är bara början

## Checklista för ledare

- [ ] Tydligt syfte definierat
- [ ] Plan för kommunikation klar
- [ ] Utbildningsplan på plats
- [ ] Pilotprojekt identifierat
- [ ] Ambassadörer rekryterade
- [ ] Supportstruktur etablerad
- [ ] Successkriterier definierade

## Slutsats

AI-transformation är i grunden en förändringsprocess. Tekniken är den enkla delen. Att ta med människorna på resan är det som avgör framgång.

Investera tid i förberedelse och kommunikation. Det betalar sig.`,
    keywords: "AI-transformation, förändringsledning, team, utbildning, implementation"
  },
  {
    title: "AI inom HR: Smartare rekrytering och onboarding",
    date: "20 aug 2023",
    category: "Insikter",
    categoryColor: "bg-pink-100",
    description: "Hur AI förändrar HR-arbetet från rekrytering till onboarding och medarbetarutveckling.",
    content: `HR-avdelningen hanterar enorma mängder data om människor. Det gör den till en perfekt kandidat för AI-stöd. Men det är också ett område där etik och transparens är extra viktigt.

## Rekrytering med AI-stöd

### Var AI hjälper

**CV-screening:** En rekryterare spenderar i snitt 6 sekunder per CV. AI kan screena hundratals på minuter och identifiera kandidater som matchar kriterierna.

**Mötesbokning:** Fram och tillbaka med tider? Låt en AI-assistent hantera schemaläggningen.

**Kandidatkommunikation:** Automatiska statusuppdateringar håller kandidater informerade utan manuellt arbete.

### Var AI behöver tillsyn

**Beslut om vem som går vidare:** AI kan föreslå, men en människa bör alltid fatta slutgiltiga beslut. Risk för bias kräver mänskligt omdöme.

**Intervjuer:** Videointervjuer med AI-analys finns, men kandidatupplevelsen kan bli kall och opersonlig.

## Bias i rekrytering - den obekväma sanningen

AI-system för rekrytering har visat sig reproducera historiska fördomar. Amazon skrotade ett system som systematiskt nedvärderade kvinnliga kandidater.

**Hur du minskar risken:**

1. Granska vilken data systemet tränats på
2. Analysera resultat uppdelat på kön, ålder, etc.
3. Ha alltid mänsklig granskning av AI-förslag
4. Var transparent mot kandidater om AI-användning

## Onboarding automatiserad

De första 90 dagarna avgör ofta om en nyanställd stannar. AI kan göra onboardingen mer konsekvent och personlig.

**Automatisera:**

- Dokument och policyer (anpassade checklistor per roll)
- IT-setup och behörigheter
- Introduktionsmöten (automatisk schemaläggning)
- Utbildningsmoduler (anpassade efter erfarenhet)

**Behåll mänskligt:**

- Mentorskap och relationsbyggande
- Kulturintroduktion
- Individuella samtal om förväntningar

## AI för medarbetarutveckling

### Lärande och utveckling

AI kan identifiera kompetensgap och föreslå utbildningar. Moderna LMS-system använder AI för att:

- Rekommendera kurser baserat på roll och karriärmål
- Anpassa inlärningstakt individuellt
- Identifiera när någon behöver extra stöd

### Engagemangsanalys

Pulsundersökningar + AI-analys kan avslöja trender i medarbetarengagemang innan de blir problem. Men var försiktig: övervakning kan skada förtroende.

## Praktisk implementation

### Börja här

1. **CV-screening** - Stor tidsbesparing, måttlig risk
2. **Schemaläggning** - Enkelt att implementera
3. **Onboarding-checklistor** - Förbättrar konsistensen

### Vänta med

1. **Automatiska avslag** - Risk för diskriminering
2. **Prestandabedömning via AI** - Etiskt minefält
3. **Personlighetsanalys** - Begränsad validitet

## ROI-exempel

Ett medelstort företag (200 anställda) som implementerade AI-screening och automatiserad onboarding såg:

- 40% snabbare tid till anställning
- 60% minskning av administrativ tid för HR
- 25% förbättring i kandidatupplevelse (mätt via NPS)
- 15% lägre omsättning första året (bättre matchning)

## Juridiska överväganden

I Sverige och EU finns regleringar som påverkar AI i HR:

- GDPR kräver transparens om automatiserat beslutsfattande
- Diskrimineringslagen gäller även för algoritmer
- Kommande EU AI Act kategoriserar HR-AI som "högrisk"

Dokumentera noggrant vilka system ni använder och hur beslut fattas.

## Slutsats

AI i HR handlar om att frigöra tid för det mänskliga: samtal, relationer, utveckling. Låt AI hantera administrationen så att HR kan fokusera på människorna.

Men gör det ansvarsfullt. HR handlar om människors liv och karriärer. Etik kan inte vara en eftertanke.`,
    keywords: "HR, rekrytering, onboarding, AI i HR, medarbetarutveckling"
  }
];

/**
 * Genererar en slug från titel
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Skapar ett blogginlägg via API
 */
async function createPost(postData) {
  const response = await fetch(`${BASE_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    body: JSON.stringify({
      ...postData,
      author: 'Markus Westerlund',
      published: true
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to create post: ${error.message}`);
  }

  return response.json();
}

/**
 * Genererar och sparar bild för ett inlägg
 */
async function generateAndSaveImage(post) {
  console.log(`   🎨 Genererar bild...`);

  const promptData = generateImagePrompt({
    title: post.title,
    description: post.description,
    category: post.category,
    content: post.content
  });

  try {
    const imageUrl = await generateImageWithOpenRouter(promptData.prompt);

    // Spara bild lokalt
    const slug = generateSlug(post.title);
    const blogDir = join(process.cwd(), 'public', 'blog', slug);
    if (!existsSync(blogDir)) {
      mkdirSync(blogDir, { recursive: true });
    }

    if (imageUrl.startsWith('data:image/')) {
      const base64Data = imageUrl.split(',')[1];
      const extension = imageUrl.split(';')[0].split('/')[1];
      const filename = `hero.${extension}`;
      const filepath = join(blogDir, filename);

      writeFileSync(filepath, Buffer.from(base64Data, 'base64'));
      console.log(`   ✅ Bild sparad: /blog/${slug}/${filename}`);

      return {
        localPath: `/blog/${slug}/${filename}`,
        altText: promptData.altText,
        success: true
      };
    }

    return { success: false, error: 'Unexpected image format' };
  } catch (error) {
    console.error(`   ❌ Bildfel: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Uppdaterar post med bild i AITable
 */
async function updatePostImage(slug, imagePath, altText) {
  const records = await getRecords(BLOG_DATASHEET_ID, { pageSize: 100 });
  const record = records.find(r => r.fields.slug === slug);

  if (record) {
    await updateRecords(BLOG_DATASHEET_ID, [{
      recordId: record.recordId,
      fields: {
        image: imagePath,
        imageAlt: altText
      }
    }]);
    console.log(`   ✅ AITable uppdaterad med bild`);
  }
}

async function main() {
  console.log('🚀 Skapar 10 nya blogginlägg\n');

  for (let i = 0; i < postsToCreate.length; i++) {
    const post = postsToCreate[i];
    console.log(`\n📝 [${i + 1}/${postsToCreate.length}] ${post.title}`);

    try {
      // Skapa inlägg
      const result = await createPost(post);
      console.log(`   ✅ Inlägg skapat: ${result.data.slug}`);

      // Generera och spara bild
      const imageResult = await generateAndSaveImage(post);

      if (imageResult.success) {
        // Uppdatera med bild
        await updatePostImage(result.data.slug, imageResult.localPath, imageResult.altText);
      }

      // Vänta lite mellan requests
      await new Promise(resolve => setTimeout(resolve, 3000));

    } catch (error) {
      console.error(`   ❌ Fel: ${error.message}`);
    }
  }

  console.log('\n✨ Klart!');
}

main().catch(console.error);
