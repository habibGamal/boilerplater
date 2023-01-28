CREATE TABLE IF NOT EXISTS products (
    id UNSIGNED INT AUTO_INCREMENT NOT NULL ,
	name VARCHAR(255) NOT NULL,
	price INT NOT NULL,
	barcode VARCHAR(255) NOT NULL UNIQUE,
	product_group_id BIGINT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (product_group_id) REFERENCES product_group(id) ON DELETE cascade
);