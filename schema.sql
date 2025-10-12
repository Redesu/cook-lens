CREATE TABLE users (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	email VARCHAR(100) NOT NULL,
	created_at TIMESTAMP NOT NULL
	CONSTRAINT users_email_unique UNIQUE (email)
)

CREATE TABLE recipes (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id UUID NOT NULL,
	title VARCHAR(100) NOT NULL,
	ingredients JSONB NOT NULL,
	instructions TEXT NOT NULL,
	cook_time INTEGER NOT NULL,
	difficulty VARCHAR(50) NOT NULL,
	image_url VARCHAR(200),
	created_at TIMESTAMP NOT NULL,
	CONSTRAINT fk_user_id
		FOREIGN KEY(user_id)
		REFERENCES users (id)
		ON DELETE CASCADE
		ON UPDATE NO ACTION
)

CREATE TABLE saved_recipes (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id UUID NOT NULL,
	recipe_id UUID NOT NULL,
	saved_at TIMESTAMP,
	
	CONSTRAINT fk_user_id
		FOREIGN KEY(user_id)
		REFERENCES users (id)
		ON DELETE CASCADE
		ON UPDATE NO ACTION,
		
	CONSTRAINT fk_recipe_id
		FOREIGN KEY (recipe_id)
		REFERENCES recipes (id)
		ON DELETE CASCADE
		ON UPDATE NO ACTION
		
)

