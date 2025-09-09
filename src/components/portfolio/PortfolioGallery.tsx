"use client"

import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, ArrowLeft, ArrowRight, Search, ExternalLink, Tag, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * UI/UX Portfolio – Single‑file React component
 * - Tailwind for styling
 * - shadcn/ui for primitives
 * - Accessible modal (Dialog) for details
 * - Search + tag filter, keyboard nav, responsive grid
 * - Minimal, elegant aesthetic for a portfolio
 */

// ---------- Types ----------
export type PortfolioItem = {
  id: string;
  title: string;
  role?: string; // e.g., UX Lead, Design Manager
  year?: string; // e.g., 2024
  thumb: string; // thumbnail URL
  images?: string[]; // optional gallery in modal
  tags: string[]; // e.g., ["UI", "Design System"]
  summary: string; // short one-liner
  description?: string; // longer case study summary
  metrics?: { label: string; value: string }[]; // e.g., NPS +24, +18% CVR
  link?: { href: string; label?: string };
};

// ---------- Sample Data (replace with your real projects) ----------
const sampleData: PortfolioItem[] = [
  {
    id: "ysass",
    title: "ysass Coupon 2.0",
    role: "Design Lead",
    year: "2025",
    thumb: "https://picsum.photos/seed/ysass/800/600",
    images: [
      "https://picsum.photos/seed/ysass1/1200/800",
      "https://picsum.photos/seed/ysass2/1200/800",
      "https://picsum.photos/seed/ysass3/1200/800",
    ],
    tags: ["Design System", "Mobile", "Growth"],
    summary: "ミッション連動型クーポン体験の再設計。CVR +18% を達成。",
    description:
      "ユーザーインサイトとA/Bテストに基づき、情報設計・UIフロー・デザイン言語を再構築。既存のアクセシビリティガイドに準拠しつつ、運用効率を高めるデザイン運用基盤を構築。",
    metrics: [
      { label: "CVR", value: "+18%" },
      { label: "NPS", value: "+24" },
    ],
    link: { href: "https://example.com/case/ysass", label: "Case Study" },
  },
  {
    id: "lawtech",
    title: "Legal Support Portal",
    role: "UX Manager",
    year: "2024",
    thumb: "https://picsum.photos/seed/law/800/600",
    images: [
      "https://picsum.photos/seed/law1/1200/800",
      "https://picsum.photos/seed/law2/1200/800",
    ],
    tags: ["Accessibility", "Public Sector", "Web"],
    summary: "公共系のアクセシビリティ AA を満たす相談導線を設計。",
    description:
      "複雑な申請プロセスをユーザージャーニーで可視化し、用語難易度の段階化と支援技術の互換性を担保。JIS X 8341-3:2016に準拠。",
    metrics: [
      { label: "Task Success", value: "+31%" },
      { label: "Drop-off", value: "-22%" },
    ],
  },
  {
    id: "agrihunt",
    title: "AgriHunt – Urban/AU Agriculture",
    role: "Product Designer",
    year: "2023",
    thumb: "https://picsum.photos/seed/agri/800/600",
    images: [
      "https://picsum.photos/seed/agri1/1200/800",
      "https://picsum.photos/seed/agri2/1200/800",
      "https://picsum.photos/seed/agri3/1200/800",
    ],
    tags: ["Social Impact", "AI", "Dashboard"],
    summary: "都市農業×AIの需給マッチング。利益と包摂性を両立。",
    description:
      "ステークホルダーの利害を行動経済学の観点で整理し、資源分配UIを設計。データ視覚化と現地検証のループで意思決定を平易化。",
  },
  {
    id: "design-system",
    title: "Enterprise Design System",
    role: "Design Ops Lead",
    year: "2022",
    thumb: "https://picsum.photos/seed/ds/800/600",
    images: [
      "https://picsum.photos/seed/ds1/1200/800",
      "https://picsum.photos/seed/ds2/1200/800",
    ],
    tags: ["Design System", "Ops", "Guidelines"],
    summary: "複数事業を横断するDS。アクセシビリティとガバナンスを両立。",
    description:
      "トークン設計、コンポーネント規約、レビュー運用、貢献プロセスを統合。可観測性を備えたデザイン品質KPIを策定。",
  },
];

// ---------- Helpers ----------
function classNames(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

const allTags = (items: PortfolioItem[]) => {
  const s = new Set<string>();
  items.forEach((i) => i.tags.forEach((t) => s.add(t)));
  return Array.from(s).sort((a, b) => a.localeCompare(b));
};

// ---------- Main Component ----------
export default function PortfolioGallery({
  items = sampleData,
  headline = "Selected UI/UX Works",
  tagline = "Design management, research, and product UI for impact.",
}: {
  items?: PortfolioItem[];
  headline?: string;
  tagline?: string;
}) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>("ALL");
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);

  const tags = useMemo(() => ["ALL", ...allTags(items)], [items]);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      const byTag = tag === "ALL" || i.tags.includes(tag);
      const q = query.trim().toLowerCase();
      const byQuery = !q ||
        i.title.toLowerCase().includes(q) ||
        i.summary.toLowerCase().includes(q) ||
        (i.description || "").toLowerCase().includes(q) ||
        i.tags.some((t) => t.toLowerCase().includes(q));
      return byTag && byQuery;
    });
  }, [items, tag, query]);

  const openItem = useCallback((idx: number) => {
    setCurrentIndex(idx);
    setOpen(true);
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      setCurrentIndex((prev) => {
        const len = filtered.length;
        if (!len) return 0;
        return (prev + dir + len) % len;
      });
    },
    [filtered.length]
  );

  // Keyboard navigation in modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (tagDropdownOpen) {
        setTagDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [tagDropdownOpen]);

  const current = filtered[currentIndex];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{headline}</h1>
            <p className="text-sm text-neutral-600 mt-1">{tagline}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                aria-label="検索"
                placeholder="作品・タグを検索"
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2 items-center">
              <Tag className="h-4 w-4 text-neutral-400" />
              <div className="relative">
                <Button 
                  variant="outline" 
                  className="pr-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTagDropdownOpen(!tagDropdownOpen);
                  }}
                >
                  {tag}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                {/* Tag dropdown menu */}
                {tagDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-xl shadow-lg border border-neutral-200 bg-white p-1 z-40">
                    {tags.map((t) => (
                      <button
                        key={t}
                        className={classNames(
                          "w-full text-left rounded-lg px-3 py-2 text-sm hover:bg-neutral-100 transition-colors",
                          t === tag && "bg-neutral-100"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          setTag(t);
                          setTagDropdownOpen(false);
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-500 mb-2">該当の作品が見つかりませんでした。</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setQuery("");
                setTag("ALL");
              }}
              className="text-sm"
            >
              フィルターをリセット
            </Button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, idx) => (
              <li key={item.id}>
                <Card className="group cursor-pointer overflow-hidden rounded-2xl border-neutral-200 hover:shadow-md transition-shadow" onClick={() => openItem(idx)}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={item.thumb}
                      alt={`${item.title} thumbnail`}
                      className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-base mb-1">{item.title}</h3>
                    <p className="text-sm text-neutral-600 mt-1 line-clamp-2 leading-relaxed">{item.summary}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.tags.slice(0, 3).map((t) => (
                        <Badge key={t} variant="secondary" className="rounded-full text-xs">{t}</Badge>
                      ))}
                      {item.tags.length > 3 && (
                        <Badge variant="secondary" className="rounded-full text-xs">
                          +{item.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {current && (
            <article className="relative">
              <button
                className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-colors"
                onClick={() => setOpen(false)}
                aria-label="閉じる"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative bg-neutral-950">
                <AnimatePresence initial={false} mode="wait">
                  <motion.img
                    key={current.images?.[0] || current.thumb}
                    src={(current.images && current.images[0]) || current.thumb}
                    alt={`${current.title} hero`}
                    className="w-full h-[38vh] sm:h-[48vh] object-cover"
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                {filtered.length > 1 && (
                  <>
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        className="ml-3 rounded-full shadow-lg hover:shadow-xl transition-shadow" 
                        onClick={() => go(-1)} 
                        aria-label="前へ"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        className="mr-3 rounded-full shadow-lg hover:shadow-xl transition-shadow" 
                        onClick={() => go(1)} 
                        aria-label="次へ"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>

              <div className="p-6 sm:p-8">
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-xl sm:text-2xl font-semibold tracking-tight">
                    {current.title}
                  </DialogTitle>
                  <DialogDescription>
                    <span className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
                      {current.role && <span className="font-medium">{current.role}</span>}
                      {current.year && <span>• {current.year}</span>}
                      <span className="flex flex-wrap gap-2">
                        {current.tags.map((t) => (
                          <Badge key={t} variant="outline" className="rounded-full text-xs">{t}</Badge>
                        ))}
                      </span>
                    </span>
                  </DialogDescription>
                </DialogHeader>

                {current.description && (
                  <p className="text-neutral-800 leading-relaxed whitespace-pre-line mb-5">
                    {current.description}
                  </p>
                )}

                {/* Metrics */}
                {current.metrics && current.metrics.length > 0 && (
                  <div className="mt-5 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {current.metrics.map((m) => (
                      <div key={m.label} className="rounded-2xl border border-neutral-200 p-3 text-center bg-neutral-50/50">
                        <div className="text-xs text-neutral-500 uppercase tracking-wide">{m.label}</div>
                        <div className="text-lg font-semibold text-neutral-900 mt-1">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Image strip */}
                {current.images && current.images.length > 1 && (
                  <div className="mt-6 mb-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {current.images.slice(1).map((src, i) => (
                      <motion.img
                        key={src}
                        src={src}
                        alt={`${current.title} detail ${i + 2}`}
                        className="w-full h-36 sm:h-40 object-cover rounded-xl border border-neutral-200"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      />
                    ))}
                  </div>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {current.link && (
                    <Button asChild variant="default">
                      <a href={current.link.href} target="_blank" rel="noreferrer">
                        {current.link.label || "View more"}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    閉じる
                  </Button>
                </div>
              </div>
            </article>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-neutral-500">
        <p>© {new Date().getFullYear()} Your Name — UI/UX Design Portfolio</p>
      </footer>
    </div>
  );
}

/**
 * --- 実装メモ ---
 * 1) データ差し替え
 *   - 上部の sampleData をあなたの実績に置き換えてください。
 *   - thumb は 4:3 を推奨、images は 1200x800 程度の横長が映えます。
 * 2) 導入
 *   - Tailwind と shadcn/ui（Button, Dialog, Input, Badge, Card）を利用しています。
 *   - 既存の Next.js / Vite プロジェクトにコンポーネントを配置して利用可能。
 * 3) アクセシビリティ
 *   - Dialog はフォーカストラップ/ARIA を備えています。
 *   - 矢印キーで前後、Esc で閉じる操作をサポート。
 * 4) 拡張例
 *   - ページング、カテゴリ別ルーティング、ケーススタディ Markdown 連携など。
 */