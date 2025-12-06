/**
 * Smoothie Machine
 *
 * Developed by: Ada Ayman
 * Course: Javascript
 *
 * References (consulted during development):
 * - MDN Web Docs:
 *   - addEventListener, querySelector, querySelectorAll, Array.prototype.map
 *     https://developer.mozilla.org/
 * - GitHub Pages documentation for static site hosting
 *
 */

/**
 * Build a smoothie 
 *
 * @param {boolean} usePremium 
 * @returns {Smoothie|PremiumSmoothie}
 */
function buildSmoothieFromForm(usePremium = null) {
  const customerName = document.getElementById("customerName").value.trim();
  const size = document.querySelector('input[name="size"]:checked').value;
  const base = document.getElementById("base").value;

  const fruitCheckboxes = document.querySelectorAll(
    'input[name="fruits"]:checked'
  );
  const fruits = Array.from(fruitCheckboxes).map((cb) => cb.value);

  const extraCheckboxes = document.querySelectorAll(
    'input[name="extras"]:checked'
  );
  const extras = Array.from(extraCheckboxes).map((cb) => cb.value);

  const sweetnessInput = document.getElementById("sweetness");
  const sweetness = parseInt(sweetnessInput.value, 10);

  const dairyFree = document.getElementById("dairyFree").checked;

  const notes = document.getElementById("notes").value.trim();

  const premiumCheckbox = document.getElementById("premiumCustomer");
  const premiumSelected = premiumCheckbox.checked;

  const shouldUsePremium =
    usePremium !== null ? usePremium : premiumSelected;

  if (shouldUsePremium) {
    return new PremiumSmoothie(
      customerName,
      size,
      base,
      fruits,
      extras,
      sweetness,
      dairyFree,
      notes
    );
  }

  return new Smoothie(
    customerName,
    size,
    base,
    fruits,
    extras,
    sweetness,
    dairyFree,
    notes
  );
}

/**
 * Update the live price preview text 
 */
function updatePricePreview() {
  const previewElement = document.querySelector("#price-preview strong");
  if (!previewElement) return;

  const smoothie = buildSmoothieFromForm();
  const price = smoothie.calculatePrice();
  previewElement.textContent = `$${price.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("smoothie-form");
  const sweetnessInput = document.getElementById("sweetness");
  const sweetnessValue = document.getElementById("sweetnessValue");

  const summarySection = document.getElementById("order-summary");
  const descriptionDiv = document.getElementById("smoothie-description");
  const priceP = document.getElementById("smoothie-price");
  const imageEl = document.getElementById("smoothie-image");

  // Live update of the sweetness slider
  sweetnessInput.addEventListener("input", () => {
    sweetnessValue.textContent = sweetnessInput.value;
    updatePricePreview();
  });

  // Update price preview whenever key options change
  const formElementsForPreview = [
    "#customerName",
    'input[name="size"]',
    "#base",
    'input[name="fruits"]',
    'input[name="extras"]',
    "#dairyFree",
    "#premiumCustomer",
    "#notes"
  ];

  formElementsForPreview.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      const eventName =
        el.type === "text" || el.tagName === "TEXTAREA" ? "input" : "change";
      el.addEventListener(eventName, updatePricePreview);
    });
  });

  // Initial preview when page loads
  updatePricePreview();

  // Handle form submission: create smoothie and show summary
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload

    const smoothie = buildSmoothieFromForm();

    // Description
    let descriptionHtml = `<p>${smoothie.getDescription()}</p>`;
    if (smoothie.notes) {
      descriptionHtml += `<p><strong>Notes:</strong> ${smoothie.notes}</p>`;
    }

    // Premium info
    if (smoothie instanceof PremiumSmoothie) {
      descriptionHtml += `<p><strong>Premium customer:</strong> loyalty discount applied.</p>`;
    }

    descriptionDiv.innerHTML = descriptionHtml;

    // Final price
    const finalPrice = smoothie.calculatePrice();
    priceP.textContent = `Total: $${finalPrice.toFixed(2)}`;

    // Image
    const type = smoothie.getType();
    imageEl.classList.remove("hidden");
    if (type === "berry") {
      imageEl.src = "images/berry-smoothie.png";
    } else if (type === "fruity") {
      imageEl.src = "images/fruity-smoothie.png";
    } else {
      imageEl.src = "images/classic-smoothie.png";
    }

    // Reveal summary section
    summarySection.classList.remove("hidden");
  });
});
