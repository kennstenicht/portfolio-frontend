import Mixin from '@ember/object/mixin';
import { set } from '@ember/object';

export default Mixin.create({
  afterModel() {
    this.setHeadTags();
  },

  setHeadTags() {
    let headTags = new Array();

    if(this.metaTitle) {
      const titleTags = [
        // Title Tag
        {
          type: 'title',
          tagId: 'title-tag',
          content: this.metaTitle
        },
        // OG Title
        {
          type: 'meta',
          tagId: 'meta-og-title',
          attrs: {
            property: 'og:title',
            content: this.metaTitle
          }
        },
        // Twitter Title
        {
           type: 'meta',
           tagId: 'meta-twitter-title',
           attrs: {
             property: 'twitter:title',
             content: this.metaTitle
           }
         }
      ]

      headTags = headTags.concat(titleTags);
    }

    if(this.metaDescription) {
      let descriptionTags = [
        // Meta Description
        {
          type: 'meta',
          tagId: 'meta-description',
          attrs: {
            name: 'description',
            content: this.metaDescription
          }
        },
        // OG Description
        {
          type: 'meta',
          tagId: 'meta-og-description',
          attrs: {
            property: 'og:description',
            content: this.metaDescription
          }
        },
        // Twitter Description
       {
          type: 'meta',
          tagId: 'meta-twitter-description',
          attrs: {
            property: 'twitter:description',
            content: this.metaDescription
          }
        }
      ];

      headTags = headTags.concat(descriptionTags);
    }

    // if(this.metaImage')) {
    //   const imageRef = storageRef.child( this.metaImage') );
    //   imageRef.getDownloadURL().then(bind(this, function(url) {
    //     let imageTags = [
    //       // OG Description
    //       {
    //         type: 'meta',
    //         tagId: 'meta-og-image',
    //         attrs: {
    //           property: 'og:image',
    //           content: url
    //         }
    //       },
    //       // Twitter Image
    //       {
    //         type: 'meta',
    //         tagId: 'meta-twitter-image',
    //         attrs: {
    //           property: 'twitter:image',
    //           content: url
    //         }
    //       }
    //     ];
    //
    //     if(this.headTags')) {
    //       headTags = this.headTags').concat(imageTags);
    //     }
    //     set(this, 'headTags', headTags);
    //   }));
    // }

    if(this.metaType == 'article') {
      let articleTags = [
        // OG Type
        {
          type: 'meta',
          tagId: 'meta-og-type',
          attrs: {
            property: 'og:type',
            content: 'article'
          }
        },
        // Article author
        {
          type: 'meta',
          tagId: 'meta-article-author',
          attrs: {
            property: 'article:author',
            content: 'ag—prop'
          }
        }
      ];

      headTags = headTags.concat(articleTags);
    }

    if(this.headTags) {
      headTags = this.headTags.concat(headTags);
    }
    set(this, 'headTags', headTags);
  }
});
