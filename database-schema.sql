-- Create knowledge_items table
CREATE TABLE knowledge_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  category TEXT, -- 使用文本字段存储分类，可以是"单词"、"语法"或"其他"
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tags table
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create knowledge_tags junction table
CREATE TABLE knowledge_tags (
  knowledge_id UUID REFERENCES knowledge_items(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (knowledge_id, tag_id)
);

-- Enable public access to all tables
ALTER TABLE knowledge_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_tags ENABLE ROW LEVEL SECURITY;

-- Knowledge items policies (public access)
CREATE POLICY "Knowledge items are viewable by everyone"
  ON knowledge_items FOR SELECT
  USING (true);

CREATE POLICY "Knowledge items can be inserted by anyone"
  ON knowledge_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Knowledge items can be updated by anyone"
  ON knowledge_items FOR UPDATE
  USING (true);

CREATE POLICY "Knowledge items can be deleted by anyone"
  ON knowledge_items FOR DELETE
  USING (true);

-- Tags policies (public access)
CREATE POLICY "Tags are viewable by everyone"
  ON tags FOR SELECT
  USING (true);

CREATE POLICY "Tags can be inserted by anyone"
  ON tags FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Tags can be updated by anyone"
  ON tags FOR UPDATE
  USING (true);

CREATE POLICY "Tags can be deleted by anyone"
  ON tags FOR DELETE
  USING (true);

-- Knowledge tags policies (public access)
CREATE POLICY "Knowledge tags are viewable by everyone"
  ON knowledge_tags FOR SELECT
  USING (true);

CREATE POLICY "Knowledge tags can be inserted by anyone"
  ON knowledge_tags FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Knowledge tags can be deleted by anyone"
  ON knowledge_tags FOR DELETE
  USING (true);
