package com.example.ecommerceapp.service;

import jakarta.servlet.ServletContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class UploadService {
    private final ServletContext servletContext;

    public String handleSaveUploadFile (MultipartFile file, String targetFolder) {
        if(file.isEmpty())
            return "";
        String rootPath = Paths.get("src", "main", "resources", "images").toAbsolutePath().toString();
        String finalName = "";
        try {
            byte[] bytes = file.getBytes();
            File dir = new File(rootPath + File.separator + targetFolder);
            if (!dir.exists()){
                dir.mkdirs();
            }
            finalName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
            //create the file on server
            File serverFile = new File( dir.getAbsolutePath() + File.separator + finalName);
            BufferedOutputStream stream = new BufferedOutputStream(
                    new FileOutputStream(serverFile));
            stream.write(bytes);
            stream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return finalName;
    }
}
