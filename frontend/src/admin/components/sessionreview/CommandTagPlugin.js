import { createTagsPlugin } from "@algolia/autocomplete-plugin-tags";
import "@algolia/autocomplete-plugin-tags/dist/theme.min.css";
// import "../../../autocomplete.css";

export const tagsPlugin = createTagsPlugin({
	getTagsSubscribers() {
		return [
			{
				sourceId: "Tricks",
				getTag({ item }) {
					return <p>{item}</p>;
				},
			},
		];
	},
});
