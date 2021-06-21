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
      privacy,
    }
  }
`;

export const GetCardList = gql`
  query getCardList($category_lg: String!,
                    $category_md: String!) {
	  articlesListByCategory (category_lg: $category_lg, category_md: $category_md ) {
      category_lg,
      category_md,
      id,
      title,
      subtitle,
      desc,
      thumbnail,
      reg_date,
      privacy,
    }
  }
`;

export const CreateArticle = gql`
  mutation CreateArticle($title: String!,
                         $subtitle: String!,
                         $contents: String!,
                         $desc: String!,
                         $category_lg: String!,
                         $category_md: String!,
                         $thumbnail: String!,
                         $privacy: String!) {
    createArticles(title:$title,
                   subtitle: $subtitle,
                   contents:$contents,
                   desc: $desc,
                   category_lg: $category_lg,
                   category_md: $category_md,
                   thumbnail: $thumbnail,
                   privacy: $privacy) {
      id
    }
  }
`;

export const UpdatePrivacy = gql`
  mutation UpdatePrivacy($id: Int!,
                         $privacy: String! ){
      updatePrivacy(id: $id, 
                    privacy: $privacy)
  }
`;

export const SendAuthEmail = gql`
  query SendAuthEmail($email: String!){
    sendAuthEmail (email: $email) {
      email,
      nickname,
      admin_flag,
      certificate,
    }
  }
`;


export const GetCurrentUser = gql`
  query GetCurrentUser{
    getCurrentUser{
      email,
      nickname,
      admin_flag,
    }
  }
`;