export const formatDate = (dateString) => {
    if (!dateString) return;

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
    const date = new Date(dateString)
    return date.toLocaleString("en-US",options);
}