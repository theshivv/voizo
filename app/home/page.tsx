"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Post = {
  id: number;
  username: string;
  content: string;
  mediaType?: "image" | "video" | "audio";
  mediaUrl?: string;
};

const PostCard = ({ post }: { post: Post }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle className="text-sm font-medium">{post.username}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{post.content}</p>
      {post.mediaType && post.mediaUrl && (
        <div className="mt-2">
          {post.mediaType === "image" && (
            <img src={post.mediaUrl} alt="Post media" className="max-w-full h-auto" />
          )}
          {post.mediaType === "video" && (
            <video src={post.mediaUrl} controls className="max-w-full h-auto" />
          )}
          {post.mediaType === "audio" && (
            <audio src={post.mediaUrl} controls className="w-full" />
          )}
        </div>
      )}
    </CardContent>
  </Card>
);

const PostForm = ({ username }: { username: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [filter, setFilter] = useState("latest");

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      setPosts([{ id: Date.now(), username, content: newPost }, ...posts]);
      setNewPost("");
    }
  };

  const filteredPosts = () => {
    switch (filter) {
      case "trending":
        return posts; // Replace with trending logic if available
      case "latest":
        return [...posts].sort((a, b) => b.id - a.id);
      default:
        return posts;
    }
  };

  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create a Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePostSubmit} className="space-y-4">
            <Textarea
              placeholder="What's on your mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="w-full"
            />
            <div className="flex space-x-2">
              <Button type="button" variant="outline" size="icon">
                Im {/* Placeholder for ImageIcon */}
              </Button>
              <Button type="button" variant="outline" size="icon">
                VI {/* Placeholder for VideoIcon */}
              </Button>
              <Button type="button" variant="outline" size="icon">
                Au {/* Placeholder for AudioIcon */}
              </Button>
            </div>
            <Button type="submit">Post</Button>
          </form>
        </CardContent>
      </Card>

      <div className="mb-4">
        <Select onValueChange={setFilter} defaultValue={filter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter posts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="trending">Trending Topics</SelectItem>
            <SelectItem value="latest">Latest Posts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredPosts().map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading...</div>}>
        <ClientPage />
      </Suspense>
    </div>
  );
}

function ClientPage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "Anonymous";
  return <PostForm username={username} />;
}
