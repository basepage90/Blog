package models

type Article struct {
	Id      string `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
	Desc    string `json:"desc"`
}

var articleList = []Article{
	Article{Id: "id1", Title: "title1", Content: "content1", Desc: "desc1"},
	Article{Id: "id2", Title: "title2", Content: "content2", Desc: "desc2"},
	Article{Id: "id3", Title: "title3", Content: "content3", Desc: "desc3"},
}

func GetAllArticles() []Article {
	return articleList
}
