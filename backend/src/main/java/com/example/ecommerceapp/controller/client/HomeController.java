package com.example.ecommerceapp.controller.client;

import com.example.ecommerceapp.dto.request.OrderRequest;
import com.example.ecommerceapp.dto.response.CartResponse;
import com.example.ecommerceapp.entity.*;
import com.example.ecommerceapp.repository.CartDetailRepository;
import com.example.ecommerceapp.repository.CartRepository;
import com.example.ecommerceapp.repository.OrderDetailRepository;
import com.example.ecommerceapp.repository.OrderRepository;
import com.example.ecommerceapp.service.CartDetailService;
import com.example.ecommerceapp.service.CartService;
import com.example.ecommerceapp.service.ProductService;
import com.example.ecommerceapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class HomeController {
    private final ProductService productService;
    private final CartService cartService;
    private final CartDetailRepository cartDetailRepository;
    private final CartDetailService cartDetailService;
    private final UserService userService;
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    @GetMapping("/")
    public ResponseEntity<List> getHomePage() {
        List<Product> productList = productService.getAllProducts();
        if (productList != null) {
            return new ResponseEntity<>(productList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/products")
    public ResponseEntity<?> getProducts(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "10") int size) {
        Page<Product> productList = productService.getPageProducts(page, size);
        if (productList != null) {
            return new ResponseEntity<>(productList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/products/search")
    public ResponseEntity<?> searchProduct(@RequestParam(defaultValue = " ") String name,
                                           @RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "10") int size,
                                           @RequestParam(required = false) String category,
                                           @RequestParam(required = false) Double minPrice,
                                           @RequestParam(required = false) String productSize,
                                           @RequestParam(required = false) String sortDirection,
                                           @RequestParam(required = false) Double maxPrice ) {
        Pageable pageable = PageRequest.of(page, size);
        Long sizeId = null;
        if (productSize != null && !productSize.trim().isEmpty()) {
            try {
                sizeId = Long.parseLong(productSize);
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().body("Invalid product size ID: " + productSize);
            }
        }
        Page<Product> productList = productService.searchProducts(name, pageable, category, minPrice, maxPrice, sizeId, sortDirection);
        if (productList != null) {
            return new ResponseEntity<>(productList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/product/image/{imageName}")
    public ResponseEntity<?> getProductImage(@PathVariable String imageName) {
        try{
            // Load the image file from the resources directory
            Path imagePath = Paths.get("src", "main", "resources", "images","productImages", imageName);
            //Load the image file as a resource
            Resource resource = new UrlResource(imagePath.toUri());
            if(resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductDetail(@PathVariable Long id) {
        Product product = this.productService.getProductById(id);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add-product-to-cart/{id}")
    public ResponseEntity<String> addProductToCart(@PathVariable long id,
                                                 @RequestParam String email, @RequestParam String size) {
        this.productService.handleAddProductToCart(email, id, size);
        return ResponseEntity.ok("product added to cart");
    }

    @GetMapping("/cart")
    public ResponseEntity<CartResponse> getUserCart(@RequestParam String email){
        Cart cart = this.cartService.getCartByUserEmail(email);
        List<CartDetail> cartDetail = this.cartDetailRepository.findCartDetailByCart(cart);
        CartResponse cartResponse = new CartResponse(cart, cartDetail);
        return new ResponseEntity<>(cartResponse, HttpStatus.OK);
    }

    @DeleteMapping("delete-cart/{id}")
    public ResponseEntity<?> deleteCartItem(@PathVariable Long id) {
        this.cartDetailService.deleteCartById(id);
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/place-order")
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest orderRequest, @RequestParam String email) {
        User user = this.userService.getUserByEmail(email);
        if(user != null) {
            Order order = new Order();
            order.setUser(user);
            order.setReceiverPhone(orderRequest.getReceiverPhone());
            order.setReceiverAddress(orderRequest.getReceiverAddress());
            order.setReceiverName(orderRequest.getReceiverName());
            order.setTotalPayment(orderRequest.getTotalPayment());
            order.setStatus("Delivering");
            orderRepository.save(order);
            Order finalOrder = order;
            List<OrderDetail> orderDetailList = orderRequest.getOrderDetail().stream().map(orderDetailRequest -> {
                OrderDetail orderDetail = new OrderDetail();
                orderDetail.setOrder(finalOrder);
                orderDetail.setQuantity(orderDetailRequest.getQuantity());
                orderDetail.setPrice(orderDetailRequest.getPrice());
                orderDetail.setSize(orderDetailRequest.getSize());
                Product product = productService.getProductById(orderDetailRequest.getProductId());
                if(product == null) {
                    throw new RuntimeException("Product not found! ");
                }
                orderDetail.setProduct(product);
                this.orderDetailRepository.save(orderDetail);
                return orderDetail;
            }).collect(Collectors.toList());
            order.setOrderDetail(orderDetailList);
            orderRepository.save(order);
        }
        return new ResponseEntity<>("Order placed successfully", HttpStatus.CREATED);
    }
}
