module.exports = ({ env }) => ({
    'transformer': {
       enabled: true,
       config: {
         responseTransforms: {
           removeAttributesKey: true,
           removeDataKey: true
         }
       }
     },
     'import-export-entries': {
       enabled: true
     }
   })