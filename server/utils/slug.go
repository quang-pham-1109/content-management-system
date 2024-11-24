package utils

import (
	"fmt"
	"strings"
	"unicode"
)

/*
Generates a slug from the title of a post's title.
eg. "Hello World" -> "hello-world"
*/
func GenerateSlug(title string) string {
	title = strings.ToLower(title)

	// Replace spaces and non-alphanumeric characters with hyphens
	var slugBuilder strings.Builder
	for _, r := range title {
		if unicode.IsLetter(r) || unicode.IsDigit(r) {
			slugBuilder.WriteRune(r)
		} else if unicode.IsSpace(r) {
			slugBuilder.WriteRune('-')
		}
	}

	// Convert the slugBuilder into a string
	slug := slugBuilder.String()

	// Remove consecutive hyphens (e.g., "--" to "-")
	slug = strings.ReplaceAll(slug, "--", "-")

	// Trim hyphens from the start and end
	slug = strings.Trim(slug, "-")

	fmt.Println("slug: ", slug)

	return slug
}
