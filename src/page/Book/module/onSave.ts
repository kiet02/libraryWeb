import { useBookAdd } from "./useBookAdd";
import { useBookUpdate } from "./useBookUpdate";
import { useChapterAdd } from "./useChapterAdd";
import { useChapterUpdate } from "./useChapterUpdate";
import { TChapter } from "@/fetchApi/type";

export const useSaveBook = ({
  showAlert,
  refetch,
  reset,
  remove,
  setValue,
  chapterData,
}: {
  showAlert: (msg: string, type: "success" | "error") => void;
  refetch: () => void;
  reset: () => void;
  remove: () => void;
  setValue: (key: string, value: any) => void;
  chapterData: TChapter[] | undefined;
}) => {
  const { mutate } = useBookAdd();
  const { mutate: mutateUpdate } = useBookUpdate();
  const { mutate: mutateChapter } = useChapterAdd();
  const { mutate: mutateUpdateChapter } = useChapterUpdate();

  const onSave = ({
    name,
    author,
    genre,
    img,
    id,
    chapters,
    updateBook,
  }: {
    name: string;
    author: string | number;
    genre: string | number;
    img: File | string;
    id: string | number;
    chapters: TChapter[];
    updateBook: boolean;
  }) => {
    const invalidChapters = chapters.some((ch) => !ch.chapter || !ch.content);
    if (invalidChapters) {
      showAlert("Please fill all chapter titles and contents.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("authorId", String(author));
    formData.append("genreId", String(genre));
    if (img) formData.append("img", img);

    const payload = { id, formData, chapters };

    if (updateBook) {
      mutateUpdate(payload, {
        onSuccess: (data) => {
          const hasExisting = chapterData?.length > 0;
          const hasNew = chapters.some((ch) => !ch.id);

          if (hasExisting) {
            mutateUpdateChapter(
              {
                id: data.id,
                chapter: chapters
                  .filter((ch) => ch.id)
                  .map(({ id, chapter, content }) => ({
                    id,
                    chapter,
                    content,
                  })),
              },
              {
                onSuccess: () => {
                  showAlert("Chapters updated!", "success");
                },
              }
            );
          }

          if (hasNew || !hasExisting) {
            mutateChapter(
              {
                id: data.id,
                chapter: chapters.filter((ch) => !ch.id),
              },
              {
                onSuccess: () => {
                  showAlert("Chapters created!", "success");
                  refetch();
                  reset();
                  remove();
                },
                onError: (err: any) => {
                  console.error(err);
                  showAlert("Create chapter failed!", "error");
                },
              }
            );
          }

          showAlert("Book updated!", "success");
          setValue("modal", false);
        },
        onError: (error: any) => {
          console.error(error);
          showAlert("Update failed", "error");
        },
      });
    } else {
      mutate(formData, {
        onSuccess: (data) => {
          mutateChapter(
            {
              id: data.id,
              chapter: chapters,
            },
            {
              onSuccess: () => {
                showAlert("Book added!", "success");
                refetch();
                reset();
                remove();
              },
              onError: (error: any) => {
                console.error(error);
                showAlert("Create chapter fail!", "error");
              },
            }
          );
          setValue("modal", false);
        },
        onError: (error: any) => {
          console.error(error);
          showAlert("Create failed", "error");
        },
      });
    }
  };

  return { onSave };
};
