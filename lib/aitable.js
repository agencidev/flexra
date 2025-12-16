/**
 * AITable API-klient
 *
 * Hanterar all kommunikation med AITable API.
 * Dokumentation: https://developers.aitable.ai/api/reference/
 */

const AITABLE_BASE_URL = "https://aitable.ai/fusion/v1";

/**
 * Hämtar alla records från en datasheet
 * @param {string} datasheetId - ID för datasheeten
 * @param {object} options - Filtreringsalternativ
 * @returns {Promise<Array>} Array med records
 */
export async function getRecords(datasheetId, options = {}) {
  const token = process.env.AITABLE_API_TOKEN;

  if (!token) {
    throw new Error("AITABLE_API_TOKEN is not configured");
  }

  const params = new URLSearchParams();

  if (options.pageSize) {
    params.append("pageSize", options.pageSize);
  }
  if (options.pageNum) {
    params.append("pageNum", options.pageNum);
  }
  if (options.sort) {
    params.append("sort", JSON.stringify(options.sort));
  }
  if (options.filterByFormula) {
    params.append("filterByFormula", options.filterByFormula);
  }
  if (options.fields) {
    options.fields.forEach(field => params.append("fields", field));
  }

  const url = `${AITABLE_BASE_URL}/datasheets/${datasheetId}/records${params.toString() ? `?${params.toString()}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`AITable API error: ${response.status} - ${error.message || response.statusText}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(`AITable error: ${data.message || "Unknown error"}`);
  }

  return data.data?.records || [];
}

/**
 * Hämtar en enskild record via ID
 * @param {string} datasheetId - ID för datasheeten
 * @param {string} recordId - ID för recorden
 * @returns {Promise<object>} Record-objekt
 */
export async function getRecord(datasheetId, recordId) {
  const records = await getRecords(datasheetId, {
    filterByFormula: `RECORD_ID() = "${recordId}"`
  });

  return records[0] || null;
}

/**
 * Skapar en eller flera records
 * @param {string} datasheetId - ID för datasheeten
 * @param {Array<object>} records - Array med record-objekt (max 10)
 * @returns {Promise<Array>} Skapade records med IDs
 */
export async function createRecords(datasheetId, records) {
  const token = process.env.AITABLE_API_TOKEN;

  if (!token) {
    throw new Error("AITABLE_API_TOKEN is not configured");
  }

  if (records.length > 10) {
    throw new Error("AITable API allows max 10 records per request");
  }

  const url = `${AITABLE_BASE_URL}/datasheets/${datasheetId}/records`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      records: records.map(fields => ({ fields }))
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`AITable API error: ${response.status} - ${error.message || response.statusText}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(`AITable error: ${data.message || "Unknown error"}`);
  }

  return data.data?.records || [];
}

/**
 * Skapar en enskild record
 * @param {string} datasheetId - ID för datasheeten
 * @param {object} fields - Fält-objekt
 * @returns {Promise<object>} Skapad record med ID
 */
export async function createRecord(datasheetId, fields) {
  const records = await createRecords(datasheetId, [fields]);
  return records[0] || null;
}

/**
 * Uppdaterar en eller flera records
 * @param {string} datasheetId - ID för datasheeten
 * @param {Array<{recordId: string, fields: object}>} updates - Array med uppdateringar
 * @returns {Promise<Array>} Uppdaterade records
 */
export async function updateRecords(datasheetId, updates) {
  const token = process.env.AITABLE_API_TOKEN;

  if (!token) {
    throw new Error("AITABLE_API_TOKEN is not configured");
  }

  if (updates.length > 10) {
    throw new Error("AITable API allows max 10 records per request");
  }

  const url = `${AITABLE_BASE_URL}/datasheets/${datasheetId}/records`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      records: updates.map(({ recordId, fields }) => ({
        recordId,
        fields
      }))
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`AITable API error: ${response.status} - ${error.message || response.statusText}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(`AITable error: ${data.message || "Unknown error"}`);
  }

  return data.data?.records || [];
}

/**
 * Uppdaterar en enskild record
 * @param {string} datasheetId - ID för datasheeten
 * @param {string} recordId - ID för recorden
 * @param {object} fields - Fält att uppdatera
 * @returns {Promise<object>} Uppdaterad record
 */
export async function updateRecord(datasheetId, recordId, fields) {
  const records = await updateRecords(datasheetId, [{ recordId, fields }]);
  return records[0] || null;
}

/**
 * Tar bort en eller flera records
 * @param {string} datasheetId - ID för datasheeten
 * @param {Array<string>} recordIds - Array med record-IDs
 * @returns {Promise<boolean>} True om lyckad
 */
export async function deleteRecords(datasheetId, recordIds) {
  const token = process.env.AITABLE_API_TOKEN;

  if (!token) {
    throw new Error("AITABLE_API_TOKEN is not configured");
  }

  const params = new URLSearchParams();
  recordIds.forEach(id => params.append("recordIds", id));

  const url = `${AITABLE_BASE_URL}/datasheets/${datasheetId}/records?${params.toString()}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`AITable API error: ${response.status} - ${error.message || response.statusText}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(`AITable error: ${data.message || "Unknown error"}`);
  }

  return true;
}

/**
 * Tar bort en enskild record
 * @param {string} datasheetId - ID för datasheeten
 * @param {string} recordId - ID för recorden
 * @returns {Promise<boolean>} True om lyckad
 */
export async function deleteRecord(datasheetId, recordId) {
  return deleteRecords(datasheetId, [recordId]);
}

/**
 * Hämtar datasheet-metadata (fält-definitioner etc.)
 * @param {string} datasheetId - ID för datasheeten
 * @returns {Promise<object>} Metadata-objekt
 */
export async function getDatasheetMeta(datasheetId) {
  const token = process.env.AITABLE_API_TOKEN;

  if (!token) {
    throw new Error("AITABLE_API_TOKEN is not configured");
  }

  const url = `${AITABLE_BASE_URL}/datasheets/${datasheetId}/fields`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`AITable API error: ${response.status} - ${error.message || response.statusText}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(`AITable error: ${data.message || "Unknown error"}`);
  }

  return data.data?.fields || [];
}
