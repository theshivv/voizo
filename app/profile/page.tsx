"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Post = {
  id: number
  content: string
  createdAt: string
}

type Activity = {
  id: number
  action: string
  createdAt: string
}

const mockPosts: Post[] = [
  { id: 1, content: "This is my first post on Voizo!", createdAt: "2023-05-01T12:00:00Z" },
  { id: 2, content: "Enjoying the anonymity here.", createdAt: "2023-05-02T14:30:00Z" },
  { id: 3, content: "Great discussions happening!", createdAt: "2023-05-03T09:15:00Z" },
]

const mockActivities: Activity[] = [
  { id: 1, action: "Created a new post", createdAt: "2023-05-01T12:00:00Z" },
  { id: 2, action: "Liked a post", createdAt: "2023-05-02T15:45:00Z" },
  { id: 3, action: "Commented on a post", createdAt: "2023-05-03T10:30:00Z" },
]

export default function ProfilePage() {
  const searchParams = useSearchParams()
  const username = searchParams.get("username") || "Anonymous"

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{username}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{mockPosts.length}</p>
              <p className="text-sm text-muted-foreground">Posts</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{mockActivities.length}</p>
              <p className="text-sm text-muted-foreground">Activities</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {mockPosts.map((post) => (
            <Card key={post.id} className="mb-4">
              <CardContent className="pt-6">
                <p>{post.content}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="activity">
          {mockActivities.map((activity) => (
            <Card key={activity.id} className="mb-4">
              <CardContent className="pt-6">
                <p>{activity.action}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {new Date(activity.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}