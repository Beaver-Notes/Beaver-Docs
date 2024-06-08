import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/Beaver-Docs/__docusaurus/debug',
    component: ComponentCreator('/Beaver-Docs/__docusaurus/debug', '5e0'),
    exact: true
  },
  {
    path: '/Beaver-Docs/__docusaurus/debug/config',
    component: ComponentCreator('/Beaver-Docs/__docusaurus/debug/config', '06f'),
    exact: true
  },
  {
    path: '/Beaver-Docs/__docusaurus/debug/content',
    component: ComponentCreator('/Beaver-Docs/__docusaurus/debug/content', 'e14'),
    exact: true
  },
  {
    path: '/Beaver-Docs/__docusaurus/debug/globalData',
    component: ComponentCreator('/Beaver-Docs/__docusaurus/debug/globalData', '0e7'),
    exact: true
  },
  {
    path: '/Beaver-Docs/__docusaurus/debug/metadata',
    component: ComponentCreator('/Beaver-Docs/__docusaurus/debug/metadata', '26b'),
    exact: true
  },
  {
    path: '/Beaver-Docs/__docusaurus/debug/registry',
    component: ComponentCreator('/Beaver-Docs/__docusaurus/debug/registry', '3c1'),
    exact: true
  },
  {
    path: '/Beaver-Docs/__docusaurus/debug/routes',
    component: ComponentCreator('/Beaver-Docs/__docusaurus/debug/routes', '780'),
    exact: true
  },
  {
    path: '/Beaver-Docs/blog',
    component: ComponentCreator('/Beaver-Docs/blog', '3c0'),
    exact: true
  },
  {
    path: '/Beaver-Docs/blog/archive',
    component: ComponentCreator('/Beaver-Docs/blog/archive', '67a'),
    exact: true
  },
  {
    path: '/Beaver-Docs/blog/first-blog-post',
    component: ComponentCreator('/Beaver-Docs/blog/first-blog-post', '8e5'),
    exact: true
  },
  {
    path: '/Beaver-Docs/blog/long-blog-post',
    component: ComponentCreator('/Beaver-Docs/blog/long-blog-post', '144'),
    exact: true
  },
  {
    path: '/Beaver-Docs/blog/mdx-blog-post',
    component: ComponentCreator('/Beaver-Docs/blog/mdx-blog-post', '9a8'),
    exact: true
  },
  {
    path: '/Beaver-Docs/blog/tags',
    component: ComponentCreator('/Beaver-Docs/blog/tags', 'aaa'),
    exact: true
  },
  {
    path: '/Beaver-Docs/blog/tags/docusaurus',
    component: ComponentCreator('/Beaver-Docs/blog/tags/docusaurus', 'd82'),
    exact: true
  },
  {
    path: '/Beaver-Docs/blog/tags/facebook',
    component: ComponentCreator('/Beaver-Docs/blog/tags/facebook', '4f0'),
    exact: true
  },
  {
    path: '/Beaver-Docs/blog/tags/hello',
    component: ComponentCreator('/Beaver-Docs/blog/tags/hello', 'cd5'),
    exact: true
  },
  {
    path: '/Beaver-Docs/blog/tags/hola',
    component: ComponentCreator('/Beaver-Docs/blog/tags/hola', 'fd9'),
    exact: true
  },
  {
    path: '/Beaver-Docs/blog/welcome',
    component: ComponentCreator('/Beaver-Docs/blog/welcome', 'b63'),
    exact: true
  },
  {
    path: '/Beaver-Docs/markdown-page',
    component: ComponentCreator('/Beaver-Docs/markdown-page', '833'),
    exact: true
  },
  {
    path: '/Beaver-Docs/docs',
    component: ComponentCreator('/Beaver-Docs/docs', 'ca5'),
    routes: [
      {
        path: '/Beaver-Docs/docs',
        component: ComponentCreator('/Beaver-Docs/docs', '77d'),
        routes: [
          {
            path: '/Beaver-Docs/docs',
            component: ComponentCreator('/Beaver-Docs/docs', '7f9'),
            routes: [
              {
                path: '/Beaver-Docs/docs/category/beaver-notes',
                component: ComponentCreator('/Beaver-Docs/docs/category/beaver-notes', '062'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Beaver-Docs/docs/category/beaver-notes-1',
                component: ComponentCreator('/Beaver-Docs/docs/category/beaver-notes-1', 'd8f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Beaver-Docs/docs/category/dev-docs',
                component: ComponentCreator('/Beaver-Docs/docs/category/dev-docs', '146'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Beaver-Docs/docs/category/user-guides',
                component: ComponentCreator('/Beaver-Docs/docs/category/user-guides', 'b72'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Beaver-Docs/docs/dev-docs/Beaver Notes/Building and Testing Beaver Notes',
                component: ComponentCreator('/Beaver-Docs/docs/dev-docs/Beaver Notes/Building and Testing Beaver Notes', '2ba'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Beaver-Docs/docs/dev-docs/Beaver Notes/Data API',
                component: ComponentCreator('/Beaver-Docs/docs/dev-docs/Beaver Notes/Data API', 'f24'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Beaver-Docs/docs/dev-docs/Beaver Notes/How to contribure',
                component: ComponentCreator('/Beaver-Docs/docs/dev-docs/Beaver Notes/How to contribure', '02c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Beaver-Docs/docs/dev-docs/Beaver Notes/Legacy Localization',
                component: ComponentCreator('/Beaver-Docs/docs/dev-docs/Beaver Notes/Legacy Localization', 'aac'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Beaver-Docs/docs/dev-docs/Beaver Notes/Localization',
                component: ComponentCreator('/Beaver-Docs/docs/dev-docs/Beaver Notes/Localization', '473'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Beaver-Docs/docs/dev-docs/Beaver Notes/Packaging the app',
                component: ComponentCreator('/Beaver-Docs/docs/dev-docs/Beaver Notes/Packaging the app', '392'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Beaver-Docs/docs/dev-docs/Beaver Notes/Setup Your Environment',
                component: ComponentCreator('/Beaver-Docs/docs/dev-docs/Beaver Notes/Setup Your Environment', '37e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Beaver-Docs/docs/user-docs/Beaver Notes/Getting Around',
                component: ComponentCreator('/Beaver-Docs/docs/user-docs/Beaver Notes/Getting Around', '7bf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Beaver-Docs/docs/user-docs/Beaver Notes/Install',
                component: ComponentCreator('/Beaver-Docs/docs/user-docs/Beaver Notes/Install', '99b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Beaver-Docs/docs/user-docs/Beaver Notes/Labels',
                component: ComponentCreator('/Beaver-Docs/docs/user-docs/Beaver Notes/Labels', '1c7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Beaver-Docs/docs/user-docs/Beaver Notes/Markdown syntax',
                component: ComponentCreator('/Beaver-Docs/docs/user-docs/Beaver Notes/Markdown syntax', '6a2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Beaver-Docs/docs/user-docs/Beaver Notes/Password',
                component: ComponentCreator('/Beaver-Docs/docs/user-docs/Beaver Notes/Password', '96d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Beaver-Docs/docs/user-docs/Beaver Notes/Set up the Sync',
                component: ComponentCreator('/Beaver-Docs/docs/user-docs/Beaver Notes/Set up the Sync', '544'),
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
    path: '/Beaver-Docs/',
    component: ComponentCreator('/Beaver-Docs/', '8ea'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
