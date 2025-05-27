import { Blog } from "./blog-details.component";

// blogsData array stores multiple blog objects with structured data.
export const blogsData:Blog[] = [
    // First blog entry
    {
      id: 1,
      title: 'BLOG-DETAILS.BLOG_1.TITLE',
      image: 'assets/images/blog1.jpg',
      content: [
        {
          type: 'paragraph',html: 'BLOG-DETAILS.BLOG_1.PARAGRAPH_1'
        },
        {
          type: 'list',
          listType: 'ul',
          items: [
              { html: 'BLOG-DETAILS.BLOG_1.LIST_1.0'},
              { html: 'BLOG-DETAILS.BLOG_1.LIST_1.1'},
              {html: 'BLOG-DETAILS.BLOG_1.LIST_1.2'}
          ]
        },
        {
          type: 'paragraph',
          html: 'BLOG-DETAILS.BLOG_1.PARAGRAPH_2' 
        }
      ]
    },
    // Second blog entry
    {
      id: 2,
      title: 'BLOG-DETAILS.BLOG_2.TITLE',
      image: 'assets/images/blog2.jpg',
      content: [
        {
          type: 'paragraph', html: 'BLOG-DETAILS.BLOG_2.PARAGRAPH_1'
        },
        {
          type: 'list',
          listType: 'ol',
          items: [
            { html: 'BLOG-DETAILS.BLOG_2.LIST_1.0' },
            { html: 'BLOG-DETAILS.BLOG_2.LIST_1.1' },
            { html: 'BLOG-DETAILS.BLOG_2.LIST_1.2'},
            { html: 'BLOG-DETAILS.BLOG_2.LIST_1.3' },
            { html: 'BLOG-DETAILS.BLOG_2.LIST_1.4' }
          ]
        },
        {
          type: 'paragraph', html:  'BLOG-DETAILS.BLOG_2.PARAGRAPH_2'
        }
      ]
    },
    // Third blog entry
    {
      id: 3,
      title: 'BLOG-DETAILS.BLOG_3.TITLE',
      image: 'assets/images/blog3.jpg',
      content: [
        {
          type: 'paragraph',
          html: 'BLOG-DETAILS.BLOG_3.PARAGRAPH_1'
        },
        {
          type: 'list',
          listType: 'ul',
          items: [
            { html: 'BLOG-DETAILS.BLOG_3.LIST_1.0'},
            { html: 'BLOG-DETAILS.BLOG_3.LIST_1.1'},
            { html: 'BLOG-DETAILS.BLOG_3.LIST_1.2' }
          ]
        },
        {
          type: 'paragraph',
          html: 'BLOG-DETAILS.BLOG_3.PARAGRAPH_2'
        }
      ]
    }
];