document.addEventListener("DOMContentLoaded", () => {
  const sweetnessInput = document.getElementById("sweetness");
  const sweetnessValue = document.getElementById("sweetnessValue");

  // updates the number visually when sliding
  sweetnessInput.addEventListener("input", () => {
    sweetnessValue.textContent = sweetnessInput.value;
  });
});
