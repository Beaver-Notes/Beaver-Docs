import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'b2f'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', '89a'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post', '9ad'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post', 'e9f'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '287'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', '704'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', '858'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', '299'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', '00d'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', 'd2b'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '025'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '0a2'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'd37'),
            routes: [
              {
                path: '/docs/category/dev-docs',
                component: ComponentCreator('/docs/category/dev-docs', 'db3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/user-guides',
                component: ComponentCreator('/docs/category/user-guides', '189'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/dev-docs/Building and Testing Beaver Notes',
                component: ComponentCreator('/docs/dev-docs/Building and Testing Beaver Notes', 'dab'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/dev-docs/How to contribure',
                component: ComponentCreator('/docs/dev-docs/How to contribure', '871'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/dev-docs/Localization',
                component: ComponentCreator('/docs/dev-docs/Localization', '463'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/dev-docs/Localization (Legacy)',
                component: ComponentCreator('/docs/dev-docs/Localization (Legacy)', 'c29'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/dev-docs/Packaging the app',
                component: ComponentCreator('/docs/dev-docs/Packaging the app', 'cc7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/dev-docs/Setup Your Environment',
                component: ComponentCreator('/docs/dev-docs/Setup Your Environment', '659'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/user-docs/Getting Around',
                component: ComponentCreator('/docs/user-docs/Getting Around', 'f79'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/user-docs/Install',
                component: ComponentCreator('/docs/user-docs/Install', '04f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/user-docs/Labels',
                component: ComponentCreator('/docs/user-docs/Labels', '361'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/user-docs/Markdown syntax',
                component: ComponentCreator('/docs/user-docs/Markdown syntax', '650'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/user-docs/Password',
                component: ComponentCreator('/docs/user-docs/Password', '7ad'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/user-docs/Set up the Sync',
                component: ComponentCreator('/docs/user-docs/Set up the Sync', '6cb'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
