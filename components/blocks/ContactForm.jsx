"use client";

import { useState, useRef } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { GetStartedButton } from "../ui/get-started-button";
import { Turnstile } from "@marsidev/react-turnstile";

/**
 * ContactForm Block
 *
 * Återanvändbart kontaktformulär med två-kolumn layout.
 * Följer Flexra styleguide för inputs, färger och spacing.
 * Inkluderar Cloudflare Turnstile för spam-skydd.
 *
 * @example
 * <ContactForm
 *   onSubmit={async (data) => { await sendToAPI(data); }}
 *   title="Kontakta oss"
 * />
 */

const defaultFormFields = [
  {
    name: "name",
    label: "Namn",
    type: "text",
    placeholder: "Ditt namn",
    required: true,
  },
  {
    name: "email",
    label: "E-post",
    type: "email",
    placeholder: "din@email.se",
    required: true,
  },
  {
    name: "company",
    label: "Företag",
    type: "text",
    placeholder: "Ditt företag (valfritt)",
    required: false,
  },
  {
    name: "message",
    label: "Meddelande",
    type: "textarea",
    placeholder: "Berätta om ditt projekt eller ställ en fråga...",
    required: true,
    rows: 5,
  },
];

// Input styling from styleguide (font-family inherited from body - DM Sans)
const inputBaseStyles = `
  w-full px-4 py-3 rounded-xl border border-gray-200
  focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200
  transition-colors bg-white text-gray-900 placeholder:text-gray-400
  font-sans text-base
`;

const labelStyles = "block text-sm font-medium text-gray-700 mb-2 font-sans";

function FormField({ field, value, onChange, error }) {
  const { name, label, type, placeholder, required, rows } = field;
  const id = `contact-${name}`;

  const commonProps = {
    id,
    name,
    value,
    onChange: (e) => onChange(name, e.target.value),
    placeholder,
    required,
    "aria-invalid": error ? "true" : "false",
    "aria-describedby": error ? `${id}-error` : undefined,
    className: `${inputBaseStyles} ${error ? "border-red-300 focus:border-red-400 focus:ring-red-200" : ""}`,
  };

  return (
    <div>
      <label htmlFor={id} className={labelStyles}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea {...commonProps} rows={rows || 4} />
      ) : (
        <input {...commonProps} type={type} />
      )}

      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600 flex items-center gap-1 font-sans">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({
  // Innehåll
  title = "Kontakta oss",
  subtitle = "Har du frågor om våra tjänster eller vill diskutera ett projekt? Fyll i formuläret så återkommer vi inom 24 timmar.",
  badge = "Kontakt",

  // Vänster kolumn - extra info
  contactInfo = [
    { label: "E-post", value: "hej@flexra.se", href: "mailto:hej@flexra.se" },
  ],
  features = [
    "Svar inom 24 timmar",
    "Kostnadsfri rådgivning",
    "Ingen bindningstid",
  ],

  // Formulär
  fields = defaultFormFields,
  submitText = "Skicka meddelande",
  successMessage = "Tack för ditt meddelande! Vi återkommer så snart som möjligt.",
  errorMessage = "Något gick fel. Försök igen eller kontakta oss direkt via e-post.",

  // Turnstile
  turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,

  // Callbacks
  onSubmit,

  // Styling
  background = "gray",
}) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [turnstileToken, setTurnstileToken] = useState(null);
  const turnstileRef = useRef(null);

  const bgClass = background === "white" ? "bg-white" : "bg-[#f8f8f6]";

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    fields.forEach((field) => {
      const value = formData[field.name]?.trim();

      if (field.required && !value) {
        newErrors[field.name] = "Detta fält är obligatoriskt";
      } else if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = "Ange en giltig e-postadress";
        }
      }
    });

    // Check Turnstile token if site key is configured
    if (turnstileSiteKey && !turnstileToken) {
      newErrors.turnstile = "Vänligen verifiera att du inte är en robot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("loading");

    try {
      // Verify Turnstile token on server if configured
      if (turnstileSiteKey && turnstileToken) {
        const verifyResponse = await fetch("/api/turnstile/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: turnstileToken }),
        });

        const verifyData = await verifyResponse.json();

        if (!verifyData.success) {
          setErrors({ turnstile: "Verifieringen misslyckades. Försök igen." });
          setStatus("idle");
          turnstileRef.current?.reset();
          setTurnstileToken(null);
          return;
        }
      }

      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default: simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Form submitted:", formData);
      }

      setStatus("success");
      setFormData({});
      setTurnstileToken(null);
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setFormData({});
    setErrors({});
    setTurnstileToken(null);
    turnstileRef.current?.reset();
  };

  return (
    <section className={`px-[5%] py-16 md:py-24 lg:py-28 ${bgClass}`}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Vänster kolumn - Info */}
          <div>
            <span className="inline-block px-4 py-1.5 text-xs font-medium rounded-full bg-white text-gray-600 border border-gray-200 mb-6 uppercase tracking-[0.2em]">
              {badge}
            </span>
            <h2 className="mb-6">{title}</h2>
            <p className="text-gray-600 mb-8 max-w-md">{subtitle}</p>

            {/* Features */}
            {features && features.length > 0 && (
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-lime-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-lime-700" strokeWidth={3} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            {/* Contact Info */}
            {contactInfo && contactInfo.length > 0 && (
              <div className="space-y-2">
                {contactInfo.map((info, index) => (
                  <p key={index} className="text-gray-600">
                    <span className="font-medium text-gray-900">{info.label}:</span>{" "}
                    {info.href ? (
                      <a
                        href={info.href}
                        className="hover:underline transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      info.value
                    )}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Höger kolumn - Formulär */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                <div className="w-16 h-16 rounded-full bg-lime-100 flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-lime-700" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3">Tack!</h3>
                <p className="text-gray-600 max-w-sm mb-6">{successMessage}</p>
                <button
                  onClick={resetForm}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Skicka ett till meddelande
                </button>
              </div>
            ) : status === "error" ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
                  <AlertCircle className="w-8 h-8 text-red-600" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3">Något gick fel</h3>
                <p className="text-gray-600 max-w-sm mb-6">{errorMessage}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Försök igen
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {fields.map((field) => (
                  <FormField
                    key={field.name}
                    field={field}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    error={errors[field.name]}
                  />
                ))}

                {/* Cloudflare Turnstile */}
                {turnstileSiteKey && (
                  <div className="flex flex-col items-center">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={turnstileSiteKey}
                      onSuccess={(token) => {
                        setTurnstileToken(token);
                        if (errors.turnstile) {
                          setErrors((prev) => ({ ...prev, turnstile: undefined }));
                        }
                      }}
                      onError={() => {
                        setTurnstileToken(null);
                        setErrors((prev) => ({ ...prev, turnstile: "Verifieringen misslyckades" }));
                      }}
                      onExpire={() => {
                        setTurnstileToken(null);
                      }}
                      options={{
                        theme: "light",
                        language: "sv",
                      }}
                    />
                    {errors.turnstile && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.turnstile}
                      </p>
                    )}
                  </div>
                )}

                <div className="pt-2">
                  <GetStartedButton
                    type="submit"
                    dark
                    loading={status === "loading"}
                    loadingText="Skickar meddelande..."
                    className="w-full"
                  >
                    {submitText}
                  </GetStartedButton>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Genom att skicka godkänner du vår{" "}
                  <a href="/integritetspolicy" className="underline hover:text-gray-700">
                    integritetspolicy
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
