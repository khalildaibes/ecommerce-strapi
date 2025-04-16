const fs = require('fs');
const path = require('path');

// Function to create directories and files for the new content type
const createContentType = (contentTypeName, attributes) => {
  const apiPath = path.join(__dirname, 'src', 'api', contentTypeName);

  // Define directory structure for the content type
  const directories = [
    path.join(apiPath, 'controllers'),
    path.join(apiPath, 'services'),
    path.join(apiPath, 'routes'),
    path.join(apiPath, 'config'),
    path.join(apiPath, 'models'),
    path.join(apiPath, 'content-types', `${contentTypeName}`),
  ];

  // Create directories if they don't exist
  directories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Create the controller file
  const controllerContent = `
/**
 * ${contentTypeName} controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::${contentTypeName}.${contentTypeName}');
`;
  fs.writeFileSync(path.join(apiPath, 'controllers', `${contentTypeName}.ts`), controllerContent);

  // Create the service file
  const serviceContent = `
/**
 * ${contentTypeName} service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::${contentTypeName}.${contentTypeName}');
`;
  fs.writeFileSync(path.join(apiPath, 'services', `${contentTypeName}.ts`), serviceContent);

  // Create the router file
  const routeContent = `
/**
 * ${contentTypeName} router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::${contentTypeName}.${contentTypeName}');
`;
  fs.writeFileSync(path.join(apiPath, 'routes', `${contentTypeName}.ts`), routeContent);

  // Create the schema (content type definition)
  const schemaContent = {
    kind: "collectionType",
    collectionName: `${contentTypeName}s`,
    info: {
      singularName: contentTypeName.toLowerCase(),
      pluralName: `${contentTypeName.toLowerCase()}s`,
      displayName: contentTypeName.charAt(0).toUpperCase() + contentTypeName.slice(1),
      description: `A collection for ${contentTypeName}`
    },
    options: {
      draftAndPublish: true,
    },
    attributes: attributes,
  };

  fs.writeFileSync(
    path.join(apiPath, 'content-types', `${contentTypeName}`, `schema.json`),
    JSON.stringify(schemaContent, null, 2)
  );

  console.log(`Content Type '${contentTypeName}' created successfully!`);
};

// Define attributes for Article
const articleAttributes = {
  title: {
    type: 'string',
  },
  description: {
    type: 'text',
  },
  slug: {
    type: 'uid',
    targetField: 'title',
  },
  cover: {
    type: 'media',
    multiple: false,
    allowedTypes: ['images'],
  },
  author: {
    type: 'relation',
    relation: 'manyToOne',
    target: 'api::author.author',
  },
  categories: {
    type: 'relation',
    relation: 'manyToMany',
    target: 'api::category.category',
  },
  blocks: {
    type: 'dynamiczone',
    components: ['media', 'quote', 'rich-text', 'slider'],
  },
  content: {
    type: 'richtext',
  },
  conver: {
    type: 'media',
    multiple: false,
    allowedTypes: ['images'],
  },
  vedioLinks: {
    type: 'component',
    repeatable: true,
    component: 'links.video-link',
  },
};

// Define attributes for Author
const authorAttributes = {
  name: {
    type: 'string',
  },
  avatar: {
    type: 'media',
    multiple: false,
    allowedTypes: ['images'],
  },
  email: {
    type: 'string',
  },
  articles: {
    type: 'relation',
    relation: 'oneToMany',
    target: 'api::article.article',
  },
};

// Define attributes for Category
const categoryAttributes = {
  name: {
    type: 'string',
  },
  slug: {
    type: 'uid',
    targetField: 'name',
  },
  description: {
    type: 'text',
  },
  articles: {
    type: 'relation',
    relation: 'manyToMany',
    target: 'api::article.article',
  },
};

// Define attributes for Parts
const partsAttributes = {
  slug: {
    type: 'uid',
    targetField: 'title',
  },
  title: {
    type: 'string',
  },
  description: {
    type: 'text',
  },
  date: {
    type: 'datetime',
  },
  images: {
    type: 'media',
    multiple: true,
    allowedTypes: ['images'],
  },
  stores: {
    type: 'relation',
    relation: 'manyToMany',
    target: 'api::store.store',
  },
  available: {
    type: 'boolean',
  },
  details: {
    type: 'json',
  },
  price: {
    type: 'decimal',
  },
  categories: {
    type: 'string',
  },
};

// Define attributes for Product
const productAttributes = {
  image: {
    type: 'media',
    multiple: false,
    allowedTypes: ['images'],
  },
  categories: {
    type: 'string',
  },
  quantity: {
    type: 'integer',
  },
  name: {
    type: 'string',
  },
  slug: {
    type: 'uid',
    targetField: 'name',
  },
  price: {
    type: 'decimal',
  },
  details: {
    type: 'json',
  },
  store: {
    type: 'relation',
    relation: 'manyToOne',
    target: 'api::store.store',
  },
  services: {
    type: 'relation',
    relation: 'manyToMany',
    target: 'api::services.services',
  },
};

// Define attributes for Services
const servicesAttributes = {
  title: {
    type: 'string',
  },
  description: {
    type: 'text',
  },
  price: {
    type: 'decimal',
  },
  stores: {
    type: 'relation',
    relation: 'manyToMany',
    target: 'api::store.store',
  },
  image: {
    type: 'media',
    multiple: false,
    allowedTypes: ['images'],
  },
  date: {
    type: 'datetime',
  },
  details: {
    type: 'json',
  },
  slug: {
    type: 'uid',
    targetField: 'title',
  },
  products: {
    type: 'relation',
    relation: 'manyToMany',
    target: 'api::product.product',
  },
};

// Define attributes for Store
const storeAttributes = {
  name: {
    type: 'string',
  },
  phone: {
    type: 'string',
  },
  address: {
    type: 'string',
  },
  details: {
    type: 'richtext',
  },
  hostname: {
    type: 'string',
  },
  visits: {
    type: 'integer',
  },
  orderdetails: {
    type: 'relation',
    relation: 'oneToMany',
    target: 'api::orderdetails.orderdetails',
  },
  tags: {
    type: 'string',
  },
  provider: {
    type: 'string',
  },
  slug: {
    type: 'uid',
    targetField: 'name',
  },
  products: {
    type: 'relation',
    relation: 'oneToMany',
    target: 'api::product.product',
  },
  logo: {
    type: 'media',
    multiple: false,
    allowedTypes: ['images'],
  },
  socialMedia: {
    type: 'json',
  },
  parts: {
    type: 'relation',
    relation: 'manyToMany',
    target: 'api::parts.parts',
  },
  services: {
    type: 'relation',
    relation: 'manyToMany',
    target: 'api::services.services',
  },
  apiToken: {
    type: 'string',
  },
};

// Create all content types
createContentType('article', articleAttributes);
createContentType('author', authorAttributes);
createContentType('category', categoryAttributes);
createContentType('parts', partsAttributes);
createContentType('product', productAttributes);
createContentType('services', servicesAttributes);
createContentType('store', storeAttributes); 