import {gql} from '@apollo/react-hooks'

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
      hashtag,
      reg_date,
      desc,
      contents,
      privacy,
      category_lg,
      category_md,
      thumbnail,
    }
  }
`;

export const GetCardList = gql`
  query GetCardList($category_lg: String!,
                    $category_md: String!) {
	  articlesListByCategory (category_lg: $category_lg, category_md: $category_md) {
      category_lg,
      category_md,
      id,
      title,
      hashtag,
      desc,
      thumbnail,
      reg_date,
      privacy,
    }
  }
`;

export const GetArticlesList = gql`
  query GetArticlesList($cursorId: Int, $limit: Int, $searchType: Int, $searchWord: String, $excludedCategoryLg: String){
    articlesList(cursorId: $cursorId, limit: $limit, searchType: $searchType, searchWord: $searchWord, excludedCategoryLg: $excludedCategoryLg){
        category_lg,
        category_md,
        id,
        title,
        contents,
        hashtag,
        desc,
        thumbnail,
        reg_date,
        privacy
    }
  }
`;

export const CreateArticle = gql`
  mutation CreateArticle($title: String!,
                         $hashtag: String!,
                         $contents: String!,
                         $desc: String!,
                         $category_lg: String!,
                         $category_md: String!,
                         $thumbnail: String!,
                         $privacy: String!) {
    createArticles(title:$title,
                   hashtag: $hashtag,
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

export const UpdateArticles = gql`
  mutation UpdateArticles($id: Int!,
                         $title: String!,
                         $hashtag: String!,
                         $contents: String!,
                         $desc: String!,
                         $category_lg: String!,
                         $category_md: String!,
                         $thumbnail: String!,
                         $privacy: String!) {
    updateArticles(id:$id,
                   title:$title,
                   hashtag: $hashtag,
                   contents:$contents,
                   desc: $desc,
                   category_lg: $category_lg,
                   category_md: $category_md,
                   thumbnail: $thumbnail,
                   privacy: $privacy)
  }
`;

export const UpdatePrivacy = gql`
  mutation UpdatePrivacy($id: Int!,
                         $privacy: String! ){
      updatePrivacy(id: $id, 
                    privacy: $privacy)
  }
`;

export const DeleteArticles = gql`
  mutation DeleteArticles($id: Int!){
    deleteArticles(id: $id)
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

export const Reply = gql`
  query Reply($article_id: Int!){
    reply(article_id: $article_id){
      id,
      article_id,
      depth,
      group_no,
      sibling_name,
      name,
      reg_date,
      contents,
      blind,
      admin_flag,
    }
  }
`;

export const CreateReply = gql`
  mutation CreateReply($article_id: Int!,
                       $depth: Int!,
                       $group_no: Int!,
                       $sibling_name: String!,
                       $name: String!,
                       $password: String!,
                       $contents: String!,
                       $admin_flag: Boolean!){
    createReply(article_id: $article_id
                depth: $depth,
                group_no: $group_no,
                sibling_name: $sibling_name,
                name: $name,
                password: $password,
                contents: $contents,
                admin_flag: $admin_flag){
      id
    }
  }
`;

export const RemoveReply = gql`
  mutation RemoveReply($id: ID!,
                       $password: String!){
    removeReply(id: $id,
                password: $password)
  }
`;

export const NotificationList = gql`
  query NotificationList($reading_status: String){
    notificationList(reading_status: $reading_status){
      id,
      article_id,
      name,
      contents
      reg_date,
      reading_status
    }
  }
`;

export const ModifyReadingStatus = gql`
  mutation ModifyReadingStatus($id: ID, $reading_status: String){
    modifyReadingStatus(id: $id, reading_status: $reading_status)
  }
`;