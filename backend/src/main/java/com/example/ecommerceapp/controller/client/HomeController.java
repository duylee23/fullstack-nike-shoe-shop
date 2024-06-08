package com.example.ecommerceapp.controller.client;

import com.example.ecommerceapp.dto.response.CartResponse;
import com.example.ecommerceapp.entity.Cart;
import com.example.ecommerceapp.entity.CartDetail;
import com.example.ecommerceapp.entity.Product;
import com.example.ecommerceapp.entity.User;
import com.example.ecommerceapp.repository.CartDetailRepository;
import com.example.ecommerceapp.repository.CartRepository;
import com.example.ecommerceapp.service.CartDetailService;
import com.example.ecommerceapp.service.CartService;
import com.example.ecommerceapp.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class HomeController {
    private final ProductService productService;
    private final CartService cartService;
    private final CartDetailRepository cartDetailRepository;
    private final CartDetailService cartDetailService;

    @GetMapping("/")
    public ResponseEntity<List> getHomePage() {
        List<Product> productList = productService.getAllProducts();
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
                                                 @RequestParam String email) {
        this.productService.handleAddProductToCart(email, id);
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

//    @PostMapping("/place-order")
//    public ResponseEntity<?> placeOrder(@RequestParam("receiverName") String receiverName,
//                                        @RequestParam("receiverAddress") String receiverAddress,
//                                        @RequestParam("receiverPhone") String receiverPhone ) {
//        User currentUser = new User();
//    }


}
