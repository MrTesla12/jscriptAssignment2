// Smoothie.js
// Model classes for smoothie orders.

/**
 * Represents a single smoothie order.
 * Responsible for price calculation and human-readable description.
 */
class Smoothie {
  /**
   * @param {string} customerName
   * @param {string} size
   * @param {string} base
   * @param {string[]} fruits
   * @param {string[]} extras
   * @param {number} sweetness
   * @param {boolean} dairyFree
   * @param {string} notes
   */
  constructor(
    customerName,
    size,
    base,
    fruits = [],
    extras = [],
    sweetness = 3,
    dairyFree = false,
    notes = ""
  ) {
    this.customerName = customerName;
    this.size = size;
    this.base = base;
    this.fruits = fruits;
    this.extras = extras;
    this.sweetness = sweetness;
    this.dairyFree = dairyFree;
    this.notes = notes;
  }

  /**
   * Description of this smoothie.
   * @returns {string}
   */
  getDescription() {
    const fruitsText =
      this.fruits.length > 0 ? this.fruits.join(", ") : "no fruit selected";
    const extrasText =
      this.extras.length > 0 ? this.extras.join(", ") : "no extras";

    const dairyText = this.dairyFree ? "dairy-free" : "contains dairy";

    return `${this.customerName}, you ordered a ${this.size.toLowerCase()} smoothie with a ${this.base.toLowerCase()} base, including ${fruitsText}, and extras: ${extrasText}. Sweetness level: ${this.sweetness}/5, ${dairyText}.`;
  }

  /**
   * Calculates smoothie price based on size, fruits, extras, and dairy-free.
   * @returns {number}
   */
  calculatePrice() {
    let price = 0;

    // Base price by size
    switch (this.size) {
      case "Small":
        price += 4;
        break;
      case "Medium":
        price += 5;
        break;
      case "Large":
        price += 6;
        break;
      default:
        price += 5;
    }

    // Fruits: each +$0.75
    price += this.fruits.length * 0.75;

    // Extras: each +$0.50
    price += this.extras.length * 0.5;

    // Dairy-free surcharge
    if (this.dairyFree) {
      price += 0.5;
    }

    return price;
  }

  /**
   * Returns a simple "type" string used by the UI to pick an image.
   * @returns {string} "berry" | "fruity" | "classic"
   */
  getType() {
    if (this.fruits.includes("Blueberry")) {
      return "berry";
    }
    if (this.fruits.includes("Strawberry") || this.fruits.includes("Mango")) {
      return "fruity";
    }
    return "classic";
  }
}

/**
 * PremiumSmoothie:
 * A subclass that applies a loyalty discount to the base price.
 */
class PremiumSmoothie extends Smoothie {
  constructor(...args) {
    super(...args);
    this.isPremium = true;
  }

  /**
   * Applies a flat discount to the base smoothie price.
   * @returns {number}
   */
  calculatePrice() {
    const basePrice = super.calculatePrice();
    const discount = 0.5; // flat loyalty discount
    return Math.max(basePrice - discount, 0);
  }
}
