'use client';

import { RocketIcon } from './icons/RocketIcon';
import Link from 'next/link';

interface ShareLinkProps {
  text: string;
}

export function ShareLink({ text }: ShareLinkProps) {
  return (
    <Link
      href={getTwitterHref(text)}
      className="focus-visible:ariakit-outline mt-4 flex h-12 w-max items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-emerald-500 px-4 font-medium text-gray-50 shadow-xl hover:bg-emerald-600 sm:text-lg"
    >
      <RocketIcon />
      Share with your friends
    </Link>
  );
}

export const intentUrl = 'https://twitter.com/intent/tweet';

function getTwitterHref(text: string) {
  const shareUrl = new URL(intentUrl);
  const search = new URLSearchParams({
    text,
  }).toString();

  shareUrl.search = search;

  return shareUrl.href;
}
