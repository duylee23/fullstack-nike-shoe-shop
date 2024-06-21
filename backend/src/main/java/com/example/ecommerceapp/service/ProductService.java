package com.example.ecommerceapp.service;


import com.example.ecommerceapp.entity.*;
import com.example.ecommerceapp.repository.*;
import com.example.ecommerceapp.util.ProductSpecification;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.boot.web.reactive.filter.OrderedWebFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.sound.sampled.Port;
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
    private final OrderDetailRepository orderDetailRepository;
    private final OrderRepository orderRepository;

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

    public void handleAddProductToCart(String email, long productId, String size){
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
                CartDetail oldDetail = this.cartDetailRepository.findByCartAndProductAndSize(cart, product, size);
                if(oldDetail == null) {
                    CartDetail cartDetail = new CartDetail();
                    cartDetail.setCart(cart);
                    cartDetail.setProduct(product);
                    cartDetail.setPrice(product.getPrice());
                    cartDetail.setQuantity(1);
                    cartDetail.setSize(size);
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

    public void handlePlaceOrder(User user, String receiverName, String receiverAddress, String receiverPhone, Double totalPayment, int quantity, Double price, String size) {
        //create order
        Order order = new Order();
        order.setUser(user);
        order.setReceiverName(receiverName);
        order.setStatus("Delivering");
        order.setReceiverAddress(receiverAddress);
        order.setReceiverPhone(receiverPhone);
        order.setTotalPayment(totalPayment);
//        order.setOrderDetails();

        //create order detail
        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setQuantity(quantity);
        orderDetail.setPrice(price);
        orderDetail.setSize(size);
        orderDetail.setOrder(order);
        this.orderDetailRepository.save(orderDetail);



    }

    //for pagination
    public Page<Product> getPageProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
    }

    //for filtering
    public Page<Product> searchProducts(String name, Pageable pageable, String category, Double minPrice, Double maxPrice, Long size, String sortDirection) {
        Specification<Product> specification = Specification
                .where(ProductSpecification.hasName(name))
                .and(ProductSpecification.hasCategory(category))
                .and(ProductSpecification.hasPriceBetween(minPrice, maxPrice))
                .and(ProductSpecification.hasSize(size))
                .and(ProductSpecification.sortByPrice(sortDirection));
        return productRepository.findAll(specification, pageable);
    }
}
