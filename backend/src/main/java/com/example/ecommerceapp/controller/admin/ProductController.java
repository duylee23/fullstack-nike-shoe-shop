package com.example.ecommerceapp.controller.admin;

import com.example.ecommerceapp.entity.Product;
import com.example.ecommerceapp.entity.Size;
import com.example.ecommerceapp.service.ProductService;
import com.example.ecommerceapp.service.SizeService;
import com.example.ecommerceapp.service.UploadService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController()
@RequestMapping("/admin")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final UploadService uploadService;
    private final SizeService sizeService;

    @GetMapping("/product")
    public ResponseEntity<List> getProductList() {
        List<Product> productList = this.productService.getAllProducts();
        if (productList != null) {
            return new ResponseEntity<>(productList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/product/delete/{id}")
    public ResponseEntity<?> deleteProductById(@PathVariable Long id) {
        this.productService.deleteProductById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/product/create")
    public ResponseEntity<?> createNewProduct(@ModelAttribute Product product,
                                                    @RequestParam("file") MultipartFile file,
                                                    @RequestParam("size")  String sizeJson) {
        try {
            // handle size
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Long> sizeValues = objectMapper.readValue(sizeJson, new TypeReference<Map<String, Long>>() {});

            // Handle size values
            List<Size> sizes = new ArrayList<>();
            for (Map.Entry<String, Long> entry : sizeValues.entrySet()) {
                String sizeName = entry.getKey();
                Long sizeNumber;
                try {
                    sizeNumber = Long.parseLong(sizeName);
                } catch (NumberFormatException e) {
                    // Handle invalid format for sizeName
                    return ResponseEntity.badRequest().body("Invalid size number format: " + sizeName);
                }
                Size sizeObject = sizeService.getSizesByNumber(sizeNumber);
                sizeObject.setQuantity(entry.getValue());
                sizes.add(sizeObject);
            }
            product.setSizes(sizes);

            //handle image
            String productImage = this.uploadService.handleSaveUploadFile(file, "productImages");
            product.setImage(productImage);

            Product newProduct = this.productService.createProduct(product);
            return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
        } catch (Exception e) {
            // Handle exception appropriately
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //handle showing images
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

    @PostMapping("/product/update/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @ModelAttribute Product product,
                                                 @RequestParam("file") MultipartFile file
                                             ) {
        try{
            Product existingProduct = this.productService.getProductById(id);
            existingProduct.setName(product.getName());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setDescription(product.getDescription());
            existingProduct.setQuantity(product.getQuantity());
            // Check if a new image file is provided
                // Handle image upload and update the product's image
            if (file != null && !file.isEmpty()) {
                String productImage = this.uploadService.handleSaveUploadFile(file, "productImages");
                existingProduct.setImage(productImage);
            }

            // Save the updated product to the database
            Product updatedProduct = productService.handleSaveProduct(existingProduct);
            // Return the updated product in the response
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } catch (Exception e) {
            // Handle any errors and return an appropriate response
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable long id) {
        Product product = this.productService.getProductById(id);
        return new  ResponseEntity<>(product, HttpStatus.OK);
    }
}
