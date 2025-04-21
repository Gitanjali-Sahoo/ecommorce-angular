CREATE TABLE  products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price TEXT,
    image TEXT,
    sku TEXT,
    description TEXT,
    category TEXT,
    slug TEXT UNIQUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO products (
    name,
    price,
    image,
    sku,
    description,
    category,
    slug
) VALUES (
       'Vitamin C-serum',
       '399',
       'https://plus.unsplash.com/premium_photo-1676848403370-6427abdbe4b6?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ1fHx8ZW58MHx8fHx8',
       'ABC123',
       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur elit nec turpis eleifend, sed auctor elit tincidunt. Sed eget consequat mi, ut ultrices mi. Sed nec ligula a quam tincidunt mattis in at nibh. Maecenas non metus justo. Nulla laoreet egestas sapien in ultricies. Curabitur condimentum sed urna sit amet varius. Nunc mi sapien, pulvinar nec risus ut, tempus semper est. Nunc euismod posuere augue at congue.',
       'Serum',
       'vitamin-c-serum'
);
INSERT INTO products (
    name,
    price,
    image,
    sku,
    description,
    category,
    slug
) VALUES (
       'Ahlens Red Lipstick',
       '199',
       'https://plus.unsplash.com/premium_photo-1677541367608-7283ec1b3a2b?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8',
       'ABD123',
       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur elit nec turpis eleifend, sed auctor elit tincidunt. Sed eget consequat mi, ut ultrices mi. Sed nec ligula a quam tincidunt mattis in at nibh. Maecenas non metus justo. Nulla laoreet egestas sapien in ultricies. Curabitur condimentum sed urna sit amet varius. Nunc mi sapien, pulvinar nec risus ut, tempus semper est. Nunc euismod posuere augue at congue.',
       'Lipstick',
       'ahlens-red-lipstick'
);
INSERT INTO products (
    name,
    price,
    image,
    sku,
    description,
    category,
    slug
) VALUES (
       'Pink Juice Moisturizer',
       '299',
       'https://plus.unsplash.com/premium_photo-1676817020138-686a55ae2702?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQxfHx8ZW58MHx8fHx8',
       'ACD123',
       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur elit nec turpis eleifend, sed auctor elit tincidunt. Sed eget consequat mi, ut ultrices mi. Sed nec ligula a quam tincidunt mattis in at nibh. Maecenas non metus justo. Nulla laoreet egestas sapien in ultricies. Curabitur condimentum sed urna sit amet varius. Nunc mi sapien, pulvinar nec risus ut, tempus semper est. Nunc euismod posuere augue at congue.',
       'Moisturizer',
       'pink-juice-moisturizer'
);
INSERT INTO products (
    name,
    price,
    image,
    sku,
    description,
    category,
    slug
) VALUES (
       'Whipped Cream',
       '299',
       'https://plus.unsplash.com/premium_photo-1676823324614-84044b9d51d2?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D',
       'ACD173',
       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur elit nec turpis eleifend, sed auctor elit tincidunt. Sed eget consequat mi, ut ultrices mi. Sed nec ligula a quam tincidunt mattis in at nibh. Maecenas non metus justo. Nulla laoreet egestas sapien in ultricies. Curabitur condimentum sed urna sit amet varius. Nunc mi sapien, pulvinar nec risus ut, tempus semper est. Nunc euismod posuere augue at congue.',
       'Cream',
       'whipped-cream'
);
