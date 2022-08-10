package com.wetness;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class BackendApplication {
	public static final String APPLICATION_LOCATIONS = "spring.config.location=" +
			"classpath:application.properties, " +
			"classpath:application-aws.yml, " +
			"classpath:application-mail.yml ";

	public static final String APPLICATION_LOCATIONS = "spring.config.location=" +
			"classpath:application.properties, " +
			"classpath:application-aws.yml";

	public static void main(String[] args) {
		new SpringApplicationBuilder(BackendApplication.class)
				.properties(APPLICATION_LOCATIONS)
				.run(args);
	}
}
