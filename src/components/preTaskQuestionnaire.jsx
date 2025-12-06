// PreTaskQuestionnaire.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Pre-task questionnaire for your ISP study.
 * - Minimal-risk, short, deception-safe (no mention of conditions).
 * - Now requires all fields to be answered.
 * - "Prefer not to say" is treated as a valid response.
 */
export default function PreTaskQuestionnaire({ onSubmit }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    // Eligibility / setup
    confirmAdult: false,
    confirmFluentEnglish: false,
    deviceType: "", // "laptop_desktop" | "tablet" | "mobile"
    confirmHighSpeed: false,
    visionHearing: "", // "normal" | "corrected"
    confirmWearingAid: false,

    // Demographics
    age: "",
    gender: "",
    educationLevel: "",
    studentStatus: "",

    // Language background
    englishFirstLanguage: "",

    // AI familiarity
    aiUseFrequency: "",
    aiComfort: "", // 1-7 | "prefer_not"

    // Baseline state
    alertness: "", // 1-7 | "prefer_not"
    stress: "", // 1-7 | "prefer_not"
  });

  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState("");

  const update = (key, value) =>
    setForm((f) => ({
      ...f,
      [key]: value,
    }));

  const markTouched = (key) =>
    setTouched((t) => ({
      ...t,
      [key]: true,
    }));

  const ageNum = useMemo(() => {
    const n = parseInt(form.age, 10);
    return Number.isFinite(n) ? n : NaN;
  }, [form.age]);

  const parseScale = (value) => {
    if (!value || value === "prefer_not") return null;
    const n = parseInt(value, 10);
    return Number.isFinite(n) ? n : null;
  };

  const errors = useMemo(() => {
    const e = {};

    // Eligibility checks
    if (!form.confirmAdult) e.confirmAdult = "You must confirm you are 18 or older.";
    if (!form.confirmFluentEnglish)
      e.confirmFluentEnglish = "You must confirm you are fluent in English.";

    if (!form.deviceType) e.deviceType = "Please select your device.";
    if (form.deviceType && form.deviceType !== "laptop_desktop")
      e.deviceType = "This study requires a laptop or desktop computer.";

    if (!form.confirmHighSpeed)
      e.confirmHighSpeed = "You must confirm you have a high-speed internet connection.";

    if (!form.visionHearing) e.visionHearing = "Please select an option.";
    if (form.visionHearing === "corrected" && !form.confirmWearingAid)
      e.confirmWearingAid =
        "If your vision/hearing is corrected, please confirm you are using glasses/hearing aid.";

    // Age
    if (!form.age) e.age = "Age is required.";
    else if (!Number.isFinite(ageNum)) e.age = "Please enter a valid age.";
    else if (ageNum < 18) e.age = "You must be 18 or older to participate.";

    // ✅ Previously-optional fields are now required
    if (!form.gender) e.gender = "Please select an option.";
    if (!form.educationLevel) e.educationLevel = "Please select an option.";
    if (!form.studentStatus) e.studentStatus = "Please select an option.";
    if (!form.englishFirstLanguage) e.englishFirstLanguage = "Please select an option.";

    if (!form.aiUseFrequency) e.aiUseFrequency = "Please select an option.";
    if (!form.aiComfort) e.aiComfort = "Please select an option.";

    if (!form.alertness) e.alertness = "Please select an option.";
    if (!form.stress) e.stress = "Please select an option.";

    // Scale range validation (only if numeric)
    for (const key of ["aiComfort", "alertness", "stress"]) {
      const v = form[key];
      if (v && v !== "prefer_not") {
        const n = parseInt(v, 10);
        if (!Number.isFinite(n) || n < 1 || n > 7) {
          e[key] = "Please choose a value between 1 and 7.";
        }
      }
    }

    return e;
  }, [form, ageNum]);

  const hasErrors = Object.keys(errors).length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    setTouched({
      confirmAdult: true,
      confirmFluentEnglish: true,
      deviceType: true,
      confirmHighSpeed: true,
      visionHearing: true,
      confirmWearingAid: true,

      age: true,
      gender: true,
      educationLevel: true,
      studentStatus: true,
      englishFirstLanguage: true,

      aiUseFrequency: true,
      aiComfort: true,

      alertness: true,
      stress: true,
    });

    if (hasErrors) {
      setSubmitError("Please fix the highlighted items to continue.");
      return;
    }

    const payload = {
      ...form,
      age: ageNum,
      aiComfort: parseScale(form.aiComfort),
      alertness: parseScale(form.alertness),
      stress: parseScale(form.stress),
      submittedAt: new Date().toISOString(),
      eligible:
        form.confirmAdult &&
        form.confirmFluentEnglish &&
        form.deviceType === "laptop_desktop" &&
        form.confirmHighSpeed &&
        (form.visionHearing === "normal" ||
          (form.visionHearing === "corrected" && form.confirmWearingAid)) &&
        ageNum >= 18,
    };

    try {
      setIsSubmitting(true);

      if (typeof onSubmit === "function") {
        await onSubmit(payload);
      } else {
        console.log("PreTaskQuestionnaire payload:", payload);
      }

      navigate("/demo");
    } catch (err) {
      setSubmitError(
        err?.message || "Something went wrong while saving your responses."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    card: {
      maxWidth: 800,
      margin: "2rem auto",
      background: "#f9f9f9",
      borderRadius: 12,
      padding: "2rem",
      color: "#000",
      lineHeight: 1.5,
    },
    section: {
      marginTop: "1.5rem",
      paddingTop: "1rem",
      borderTop: "1px solid #e6e6e6",
    },
    label: { display: "block", fontWeight: 600, marginBottom: 6 },
    help: { fontSize: 12, opacity: 0.8, marginTop: 4 },
    error: { color: "#b00020", fontSize: 12, marginTop: 6 },
    row: { display: "flex", gap: "1rem", flexWrap: "wrap" },
    field: { minWidth: 220, flex: 1 },
    input: {
      width: "100%",
      padding: "0.6rem 0.75rem",
      borderRadius: 8,
      border: "1px solid #cfcfcf",
      background: "#fff",
      fontSize: 14,
    },
    select: {
      width: "100%",
      padding: "0.6rem 0.75rem",
      borderRadius: 8,
      border: "1px solid #cfcfcf",
      background: "#fff",
      fontSize: 14,
    },
    checkboxRow: {
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      marginTop: 10,
    },
    radioGroup: { display: "flex", flexDirection: "column", gap: 8 },
    submitBar: {
      marginTop: "1.75rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "1rem",
      flexWrap: "wrap",
    },
    button: {
      padding: "0.75rem 1.25rem",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      fontSize: 14,
      color: "#fff",
      background: "#198754",
    },
    buttonDisabled: {
      background: "#9cc7b1",
      cursor: "not-allowed",
    },
    subtle: { fontSize: 12, opacity: 0.8 },
  };

  const showError = (key) => touched[key] && errors[key];

  const scaleOptions = (
    <>
      <option value="">Select</option>
      <option value="prefer_not">Prefer not to say</option>
      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
    </>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div style={styles.card}>
        <h2 style={{ marginTop: 0 }}>Pre-Task Questionnaire</h2>
        <p style={styles.subtle}>
          This short questionnaire confirms eligibility and collects basic
          background information relevant to the task.
        </p>

        {/* Section 1: Eligibility / Setup */}
        <div style={styles.section}>
          <h3>Eligibility & Setup</h3>

          <div style={styles.checkboxRow}>
            <input
              id="confirmAdult"
              type="checkbox"
              checked={form.confirmAdult}
              onChange={(e) => update("confirmAdult", e.target.checked)}
              onBlur={() => markTouched("confirmAdult")}
            />
            <label htmlFor="confirmAdult">
              I confirm that I am 18 years of age or older.
            </label>
          </div>
          {showError("confirmAdult") && (
            <div style={styles.error}>{errors.confirmAdult}</div>
          )}

          <div style={styles.checkboxRow}>
            <input
              id="confirmFluentEnglish"
              type="checkbox"
              checked={form.confirmFluentEnglish}
              onChange={(e) => update("confirmFluentEnglish", e.target.checked)}
              onBlur={() => markTouched("confirmFluentEnglish")}
            />
            <label htmlFor="confirmFluentEnglish">
              I confirm that I am fluent in English.
            </label>
          </div>
          {showError("confirmFluentEnglish") && (
            <div style={styles.error}>{errors.confirmFluentEnglish}</div>
          )}

          <div style={{ marginTop: 14 }}>
            <span style={styles.label}>Which device are you using?</span>
            <div style={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="deviceType"
                  value="laptop_desktop"
                  checked={form.deviceType === "laptop_desktop"}
                  onChange={(e) => update("deviceType", e.target.value)}
                  onBlur={() => markTouched("deviceType")}
                />{" "}
                Laptop / Desktop
              </label>
              <label>
                <input
                  type="radio"
                  name="deviceType"
                  value="tablet"
                  checked={form.deviceType === "tablet"}
                  onChange={(e) => update("deviceType", e.target.value)}
                  onBlur={() => markTouched("deviceType")}
                />{" "}
                Tablet
              </label>
              <label>
                <input
                  type="radio"
                  name="deviceType"
                  value="mobile"
                  checked={form.deviceType === "mobile"}
                  onChange={(e) => update("deviceType", e.target.value)}
                  onBlur={() => markTouched("deviceType")}
                />{" "}
                Mobile phone
              </label>
            </div>
            {showError("deviceType") && (
              <div style={styles.error}>{errors.deviceType}</div>
            )}
            <div style={styles.help}>
              This study requires a laptop or desktop. Tablets and mobile phones
              are not supported.
            </div>
          </div>

          <div style={styles.checkboxRow}>
            <input
              id="confirmHighSpeed"
              type="checkbox"
              checked={form.confirmHighSpeed}
              onChange={(e) => update("confirmHighSpeed", e.target.checked)}
              onBlur={() => markTouched("confirmHighSpeed")}
            />
            <label htmlFor="confirmHighSpeed">
              I confirm that I have a stable high-speed internet connection.
            </label>
          </div>
          {showError("confirmHighSpeed") && (
            <div style={styles.error}>{errors.confirmHighSpeed}</div>
          )}

          <div style={{ marginTop: 14 }}>
            <span style={styles.label}>Vision and hearing for this study</span>
            <div style={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="visionHearing"
                  value="normal"
                  checked={form.visionHearing === "normal"}
                  onChange={(e) => update("visionHearing", e.target.value)}
                  onBlur={() => markTouched("visionHearing")}
                />{" "}
                Normal
              </label>
              <label>
                <input
                  type="radio"
                  name="visionHearing"
                  value="corrected"
                  checked={form.visionHearing === "corrected"}
                  onChange={(e) => update("visionHearing", e.target.value)}
                  onBlur={() => markTouched("visionHearing")}
                />{" "}
                Corrected-to-normal (glasses / hearing aid)
              </label>
            </div>
            {showError("visionHearing") && (
              <div style={styles.error}>{errors.visionHearing}</div>
            )}
          </div>

          {form.visionHearing === "corrected" && (
            <>
              <div style={styles.checkboxRow}>
                <input
                  id="confirmWearingAid"
                  type="checkbox"
                  checked={form.confirmWearingAid}
                  onChange={(e) => update("confirmWearingAid", e.target.checked)}
                  onBlur={() => markTouched("confirmWearingAid")}
                />
                <label htmlFor="confirmWearingAid">
                  I confirm that I am currently wearing my glasses/hearing aid.
                </label>
              </div>
              {showError("confirmWearingAid") && (
                <div style={styles.error}>{errors.confirmWearingAid}</div>
              )}
            </>
          )}
        </div>

        {/* Section 2: Demographics */}
        <div style={styles.section}>
          <h3>Demographics</h3>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="age">
                Age (years)
              </label>
              <input
                id="age"
                type="number"
                min="18"
                step="1"
                value={form.age}
                onChange={(e) => update("age", e.target.value)}
                onBlur={() => markTouched("age")}
                style={styles.input}
                placeholder="e.g., 24"
              />
              {showError("age") && <div style={styles.error}>{errors.age}</div>}
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                value={form.gender}
                onChange={(e) => update("gender", e.target.value)}
                onBlur={() => markTouched("gender")}
                style={styles.select}
              >
                <option value="">Select</option>
                <option value="woman">Woman</option>
                <option value="man">Man</option>
                <option value="nonbinary">Non-binary</option>
                <option value="self_describe">Prefer to self-describe</option>
                <option value="prefer_not">Prefer not to say</option>
              </select>
              {showError("gender") && (
                <div style={styles.error}>{errors.gender}</div>
              )}
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="educationLevel">
                Highest education level
              </label>
              <select
                id="educationLevel"
                value={form.educationLevel}
                onChange={(e) => update("educationLevel", e.target.value)}
                onBlur={() => markTouched("educationLevel")}
                style={styles.select}
              >
                <option value="">Select</option>
                <option value="high_school">High school</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="postgraduate">Postgraduate</option>
                <option value="other">Other</option>
                <option value="prefer_not">Prefer not to say</option>
              </select>
              {showError("educationLevel") && (
                <div style={styles.error}>{errors.educationLevel}</div>
              )}
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="studentStatus">
                Student status
              </label>
              <select
                id="studentStatus"
                value={form.studentStatus}
                onChange={(e) => update("studentStatus", e.target.value)}
                onBlur={() => markTouched("studentStatus")}
                style={styles.select}
              >
                <option value="">Select</option>
                <option value="kcl">King's College London student</option>
                <option value="other_student">Student at another institution</option>
                <option value="non_student">Not currently a student</option>
                <option value="prefer_not">Prefer not to say</option>
              </select>
              {showError("studentStatus") && (
                <div style={styles.error}>{errors.studentStatus}</div>
              )}
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="englishFirstLanguage">
                Is English your first language?
              </label>
              <select
                id="englishFirstLanguage"
                value={form.englishFirstLanguage}
                onChange={(e) => update("englishFirstLanguage", e.target.value)}
                onBlur={() => markTouched("englishFirstLanguage")}
                style={styles.select}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="prefer_not">Prefer not to say</option>
              </select>
              {showError("englishFirstLanguage") && (
                <div style={styles.error}>{errors.englishFirstLanguage}</div>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: AI familiarity */}
        <div style={styles.section}>
          <h3>AI Familiarity</h3>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="aiUseFrequency">
                How often do you use AI chat tools?
              </label>
              <select
                id="aiUseFrequency"
                value={form.aiUseFrequency}
                onChange={(e) => update("aiUseFrequency", e.target.value)}
                onBlur={() => markTouched("aiUseFrequency")}
                style={styles.select}
              >
                <option value="">Select</option>
                <option value="never">Never</option>
                <option value="rarely">Rarely</option>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
                <option value="prefer_not">Prefer not to say</option>
              </select>
              {showError("aiUseFrequency") && (
                <div style={styles.error}>{errors.aiUseFrequency}</div>
              )}
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="aiComfort">
                How comfortable are you using AI tools?
                <br />
                (1 = not at all, 7 = extremely comfortable)
              </label>
              <select
                id="aiComfort"
                value={form.aiComfort}
                onChange={(e) => update("aiComfort", e.target.value)}
                onBlur={() => markTouched("aiComfort")}
                style={styles.select}
              >
                {scaleOptions}
              </select>
              {showError("aiComfort") && (
                <div style={styles.error}>{errors.aiComfort}</div>
              )}
            </div>
          </div>
        </div>

        

        {/* Submit */}
        <div style={styles.submitBar}>
          <div>
            {submitError && (
              <div style={{ ...styles.error, fontSize: 13 }}>{submitError}</div>
            )}
            <div style={styles.subtle}>
              You can withdraw at any time before final submission of the study.
            </div>
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(hasErrors || isSubmitting ? styles.buttonDisabled : {}),
            }}
            disabled={hasErrors || isSubmitting}
            title={
              hasErrors
                ? "Please complete all items."
                : isSubmitting
                ? "Submitting..."
                : "Continue"
            }
          >
            {isSubmitting ? "Submitting..." : "Continue to task"}
          </button>
        </div>
      </div>
    </form>
  );
}
