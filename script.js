document.addEventListener("DOMContentLoaded", function () {
  const filterForm = document.getElementById('filter-form');
  const resetButton = document.getElementById('reset-button');
  const minPriceInput = document.getElementById('minPriceValue');
  const maxPriceInput = document.getElementById('maxPriceValue');
  const products = document.querySelectorAll('.motorcycles-list .product');
  const noResultsMessage = document.getElementById('no-results'); // Element for "No Results Found!"

  // Function to filter products based on price
  function filterProducts() {
    const minPrice = parseFloat(minPriceInput.value);
    const maxPrice = parseFloat(maxPriceInput.value);
    let visibleProducts = 0;

    products.forEach(product => {
      const productPrice = parseFloat(product.getAttribute('data-price'));

      if (productPrice >= minPrice && productPrice <= maxPrice) {
        product.style.display = "block"; // Show product
        visibleProducts++;
      } else {
        product.style.display = "none"; // Hide product
      }
    });

    // Show "No Results Found!" if no products are visible
    if (visibleProducts === 0) {
      noResultsMessage.style.display = "block"; // Display the message
    } else {
      noResultsMessage.style.display = "none"; // Hide the message
    }
  }

  // Event listener for the filter form submit
  filterForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
    filterProducts(); // Apply filter
  });

  // Event listener for the reset button
  resetButton.addEventListener('click', function () {
    minPriceInput.value = 149900; // Default minimum price
    maxPriceInput.value = 394347; // Default maximum price
    filterProducts(); // Reset the filter
  });

  // Initial filter on page load
  filterProducts();
});
