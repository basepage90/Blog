package models

import "testing"

func TestGetAllArticles(t *testing.T) {
	alist := GetAllArticles()

	// Check that the length of the list of articles returned is the
	// same as the length of the global variable holding the list
	if len(alist) != len(articleList) {
		t.Fail()
	}

	// Check that each member is identical
	for i, v := range alist {
		if v.Content != articleList[i].Content ||
			v.Id != articleList[i].Id ||
			v.Title != articleList[i].Title {

			t.Fail()
			break
		}
	}
}
