"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, VideoIcon, AudioIcon } from "lucide-react"

type Post = {
  id: number
  username: string
  content: string
  mediaType?: "image" | "video" | "audio"
  mediaUrl?: string
}

const PostCard = ({ post }: { post: Post }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle className="text-sm font-medium">{post.username}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>{post.content}</p>
      {post.mediaType && post.mediaUrl && (
        <div className="mt-2">
          {post.mediaType === "image" && <img src={post.mediaUrl} alt="Post media" className="max-w-full h-auto" />}
          {post.mediaType === "video" && <video src={post.mediaUrl} controls className="max-w-full h-auto" />}
          {post.mediaType === "audio" && <audio src={post.mediaUrl} controls className="w-full" />}
        </div>
      )}
    </CardContent>
  </Card>
)

export default function HomePage() {
  const searchParams = useSearchParams()
  const username = searchParams.get("username") || "Anonymous"
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState("")
  const [filter, setFilter] = useState("latest")

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.trim()) {
      setPosts([{ id: Date.now(), username, content: newPost }, ...posts])
      setNewPost("")
    }
  }

  const filteredPosts = () => {
    switch (filter) {
      case "trending":
        // In a real app, you'd implement trending logic here
        return posts
      case "latest":
        return [...posts].sort((a, b) => b.id - a.id)
      // Add more filter cases as needed
      default:
        return posts
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
                {/* <ImageIcon className="h-4 w-4" /> */}
                Im
              </Button>
              <Button type="button" variant="outline" size="icon">
                {/* <VideoIcon className="h-4 w-4" /> */}
                VI
              </Button>
              <Button type="button" variant="outline" size="icon">
                {/* <AudioIcon className="h-4 w-4" /> */}
                Au
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
            {/* Add more filter options here */}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredPosts().map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}