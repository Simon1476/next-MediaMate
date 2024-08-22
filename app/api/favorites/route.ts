export async function POST(request: Request) {
  try {
    const {
      mediaType: media_type,
      mediaId: media_id,
      favorite,
      accountId,
    } = await request.json();

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ media_type, media_id, favorite: favorite }),
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/account/${accountId}/favorite`,
      options
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.status_message}`);
    }

    const res = await response.json();

    return new Response(res.status_message, {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to update favorite status:", error);
    return new Response("Failed to update favorite status.", {
      status: 500,
    });
  }
}
