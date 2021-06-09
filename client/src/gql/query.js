import {gql} from 'apollo-boost'

export const GetMenuList = gql`
  query {
      categoryList{
      category_lg,
      screen_name,
      category_md{
        name,
        screen_name,
        sno,
      },
      sno
      }
  }
`;

export const GetArticles = gql`
  query GetArticles($id: Int!) {
    articles(id: $id) {
      id,
      title,
      subtitle,
      reg_date,
      desc,
      contents,
    }
  }
`;

export const GetCardList = gql`
  query getCardList($category_lg: String!, $category_md: String!) {
	  articlesListByCategory (category_lg: $category_lg, category_md: $category_md ) {
      category_lg,
      category_md,
      id,
      title,
      subtitle,
      desc,
      reg_date
    }
  }
`;

export const CreateArticle = gql`
  mutation CreateArticle( $title: String!,
                          $subtitle: String!,
                          $contents: String!,
                          $desc: String!,
                          $category_lg: String!,
                          $category_md: String!
                        ) {
    createArticles(  title:$title,
                    subtitle: $subtitle,
                    contents:$contents,
                    desc: $desc,
                    category_lg: $category_lg,
                    category_md: $category_md
                  ){
      id
    }
  }
`;