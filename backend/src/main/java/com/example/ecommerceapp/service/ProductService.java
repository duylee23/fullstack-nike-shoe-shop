package com.example.ecommerceapp.service;


import com.example.ecommerceapp.entity.*;
import com.example.ecommerceapp.repository.CartDetailRepository;
import com.example.ecommerceapp.repository.CartRepository;
import com.example.ecommerceapp.repository.ProductRepository;
import com.example.ecommerceapp.repository.SizeRepository;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final SizeRepository sizeRepository;
    private final UserService userService;
    private final CartRepository cartRepository;
    private final CartDetailRepository cartDetailRepository;

    public List<Product> getAllProducts() {
        return this.productRepository.findAll();
    }

    public Product handleSaveProduct(Product product) {
        return this.productRepository.save(product);
    }

    public Product getProductById(long id) {
        return this.productRepository.findById(id);
    }

    public void deleteProductById(long id) {
        this.productRepository.deleteById(id);
    }

    public Product createProduct(Product product) {
        return this.productRepository.save(product);
    }

    public List<Size> getAllSizes() {
        return this.sizeRepository.findAll();
    }

    public void handleAddProductToCart(String email, long productId){
        User user = this.userService.getUserByEmail(email);
        if(user != null) {
            //check if user already has cart, if not create a new cart
            Cart cart = this.cartRepository.findByUser(user);
            if(cart == null) {
                Cart otherCart = new Cart();
                otherCart.setUser(user);
//                otherCart.setSum(0);
                cart = this.cartRepository.save(otherCart);
            }
            //save cart_detail and find product by id
            Product product = this.productRepository.findById(productId);
            if(product != null) {
                CartDetail oldDetail = this.cartDetailRepository.findByCartAndProduct(cart, product);
                if(oldDetail == null) {
                    CartDetail cartDetail = new CartDetail();
                    cartDetail.setCart(cart);
                    cartDetail.setProduct(product);
                    cartDetail.setPrice(product.getPrice());
                    cartDetail.setQuantity(1);
                    this.cartDetailRepository.save(cartDetail);

                    //update sum of cart
 //                    int sum = cart.getSum() + 1;
//                    cart.setSum(sum);
                    this.cartRepository.save(cart);
                } else {
                    oldDetail.setQuantity(oldDetail.getQuantity() + 1);
                    this.cartDetailRepository.save(oldDetail);
                }
            }
        }
    }

//    public void handlePlaceOrder(User user, String receiverName, String receiverAddress, String receiverPhone) {
//        //create order
//        Order order = new Order();
//        order.setUser(user);
//        order.setReceiverName(receiverName);
//        order.setReceiverAddress(receiverAddress);
//        order.setReceiverPhone(receiverPhone);
//
//        //create order detail
//
//    }
}
