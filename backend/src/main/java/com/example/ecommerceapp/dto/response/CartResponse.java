package com.example.ecommerceapp.dto.response;

import com.example.ecommerceapp.entity.Cart;
import com.example.ecommerceapp.entity.CartDetail;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class CartResponse {
    @JsonProperty("cart")
    private Cart cart;
    @JsonProperty("cart_detail")
    private List<?> cartDetail;
}
