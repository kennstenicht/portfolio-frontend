import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';
import { bind } from '@ember/runloop';

export default Mixin.create({
  firebaseApp: service(),

  afterModel() {
    this.setHeadTags();
  },

  setHeadTags() {
    const storageRef = this.get('firebaseApp').storage().ref();
    let headTags = new Array();

    if(get(this, 'metaTitle')) {
      const titleTags = [
        // Title Tag
        {
          type: 'title',
          tagId: 'title-tag',
          content: get(this, 'metaTitle')
        },
        // OG Title
        {
          type: 'meta',
          tagId: 'meta-og-title',
          attrs: {
            property: 'og:title',
            content: get(this, 'metaTitle')
          }
        },
        // Twitter Title
        {
           type: 'meta',
           tagId: 'meta-twitter-title',
           attrs: {
             property: 'twitter:title',
             content: get(this, 'metaTitle')
           }
         }
      ]

      headTags = headTags.concat(titleTags);
    }

    if(get(this, 'metaDescription')) {
      let descriptionTags = [
        // Meta Description
        {
          type: 'meta',
          tagId: 'meta-description',
          attrs: {
            name: 'description',
            content: get(this, 'metaDescription')
          }
        },
        // OG Description
        {
          type: 'meta',
          tagId: 'meta-og-description',
          attrs: {
            property: 'og:description',
            content: get(this, 'metaDescription')
          }
        },
        // Twitter Description
       {
          type: 'meta',
          tagId: 'meta-twitter-description',
          attrs: {
            property: 'twitter:description',
            content: get(this, 'metaDescription')
          }
        }
      ];

      headTags = headTags.concat(descriptionTags);
    }

    if(get(this, 'metaImage')) {
      const imageRef = storageRef.child( get(this, 'metaImage') );
      imageRef.getDownloadURL().then(bind(this, function(url) {
        let imageTags = [
          // OG Description
          {
            type: 'meta',
            tagId: 'meta-og-image',
            attrs: {
              property: 'og:image',
              content: url
            }
          },
          // Twitter Image
          {
            type: 'meta',
            tagId: 'meta-twitter-image',
            attrs: {
              property: 'twitter:image',
              content: url
            }
          }
        ];

        if(get(this, 'headTags')) {
          headTags = get(this, 'headTags').concat(imageTags);
        }
        set(this, 'headTags', headTags);
      }));
    }

    if(get(this, 'metaType') == 'article') {
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

    if(get(this, 'headTags')) {
      headTags = get(this, 'headTags').concat(headTags);
    }
    set(this, 'headTags', headTags);
  }
});
