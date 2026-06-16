# StoryVerse Project Notes

## Known UI Issues

1. Book cover title overflow
   - Location: Homepage featured shelf, /books grid, and any reused BookCard cover visual.
   - Issue: Long titles like "The Lantern Archive" and "Letters from Amberfall" wrap awkwardly or get clipped inside the mini book-cover visual.
   - Priority: Medium
   - Fix later: Add cover-safe displayTitle, reduce cover title font size, increase cover width, or clamp title cleanly without breaking words.
