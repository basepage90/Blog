import {gql} from 'apollo-boost'

export const GetCategory = gql`
query{
    categoryList{
    category_lg,
    screen_name,
    category_md{
      name
      screen_name
      sno
    },
    sno
    }
}
 `;