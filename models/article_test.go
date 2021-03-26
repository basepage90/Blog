package models

import "testing"

func TestGetAllArticles(t *testing.T) {
	alist := GetAllArticles()

	// Check that the length of the list of articles returned is the
	// same as the length of the global variable holding the list
	if len(alist) != len(ArticleList) {
		t.Fail()
	}

	// Check that each member is identical
	for i, v := range alist {
		if v.Content != ArticleList[i].Content ||
			v.Id != ArticleList[i].Id ||
			v.Title != ArticleList[i].Title {

			t.Fail()
			break
		}
	}
}
