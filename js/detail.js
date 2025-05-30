document.addEventListener("DOMContentLoaded", () => {
    const productData = localStorage.getItem("selectedProduct");
    if (!productData) {
        document.getElementById("product-detail").innerHTML = "<p>Không tìm thấy sản phẩm.</p>";
        return;
    }

    const product = JSON.parse(productData);
    const detailDiv = document.getElementById("product-detail");

    detailDiv.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}">
        <p class="price">${product.price.toLocaleString()} VND</p>
        <p>Mô tả sản phẩm: Trà sữa với hương vị đặc trưng, ngọt ngào, dễ uống. Một sự lựa chọn tuyệt vời cho mọi lứa tuổi.</p>
        <button id="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Thêm vào giỏ hàng</button>
    `;

    // Hàm hiển thị thông báo
    function showNotification(message) {
        const notification = document.getElementById('notification');
        const messageSpan = document.getElementById('notification-message');

        messageSpan.textContent = message;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000); // Ẩn thông báo sau 3 giây
    }

    // Kiểm tra người dùng đã đăng nhập chưa
    function isLoggedIn() {
        return localStorage.getItem("isLoggedIn") === "true"; // Giả sử trạng thái đăng nhập lưu trữ ở localStorage
    }

    // Hàm thêm sản phẩm vào giỏ hàng
    function addToCart(id) {
        if (!isLoggedIn()) {
            showNotification("Bạn cần đăng nhập trước khi thêm sản phẩm vào giỏ hàng.");
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find(item => item.id === id);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        showNotification("Sản phẩm đã được thêm vào giỏ hàng!");
    }

    // Thêm sự kiện cho nút "Thêm vào giỏ hàng"
    document.getElementById("add-to-cart").addEventListener("click", function() {
        addToCart(parseInt(this.dataset.id));
    });
});
