'use client';

import { useEffect, useState } from 'react';
import RichTextArea from '@/components/ui/RichTextArea';
import { Upload, X } from 'lucide-react';
import { GalleryItem, updateGalleryItem } from '@/app/actions/gallery.actions';

interface Props {
  item: GalleryItem;
  onClose: () => void;
  onUpdate: () => void;
}

const DashGalleryUpdateModal = ({ item, onClose, onUpdate }: Props) => {
  const [title, setTitle] = useState(item.title);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState(item.coverImage);
  const [thumbnails, setThumbnails] = useState<File[]>([]);
  const [thumbPreviews, setThumbPreviews] = useState(
    item.thumbnails.map((t) => t.src)
  );
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState(item.images);
  const [description, setDescription] = useState(item.description || '');
  const [isChanged, setIsChanged] = useState(false);

  // Track changes
  useEffect(() => {
    const changed =
      title !== item.title ||
      description !== (item.description || '') ||
      coverImage !== null ||
      thumbnails.length > 0 ||
      images.length > 0;
    setIsChanged(changed);
  }, [title, description, coverImage, thumbnails, images, item]);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCoverImage(e.target.files[0]);
      setCoverPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleThumbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setThumbnails(files);
    setThumbPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const handleImagesAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const combined = [...images, ...Array.from(e.target.files)].slice(0, 4);
    setImages(combined);
    setImagePreviews(combined.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
    setImagePreviews(updated.map((f) => URL.createObjectURL(f)));
  };

  const handleUpdate = async () => {
    if (!isChanged) return;

    await updateGalleryItem(item.id, {
      title,
      coverImage: coverImage || undefined,
      thumbnails: thumbnails.length ? thumbnails : undefined,
      images: images.length ? images : undefined,
      description: description || undefined,
    });

    onUpdate();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />
      <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-lg">
        <div className="flex justify-between border-b border-border-gray px-6 py-4">
          <h2 className="text-lg font-semibold">Update Gallery Item</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto px-6 py-6 space-y-5">
          {/* Title */}
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded border border-border-gray px-3 py-2 text-sm"
              placeholder="Gallery title"
            />
          </div>

          {/* Cover */}
          <div>
            <label className="text-sm font-medium">Cover Image</label>
            <label className="mt-2 flex h-36 cursor-pointer items-center justify-center border-2 border-border-gray border-dashed rounded">
              {coverPreview ? (
                <img
                  src={coverPreview}
                  className="h-full w-full object-cover rounded"
                />
              ) : (
                <Upload />
              )}
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
              />
            </label>
          </div>

          {/* Thumbnails */}
          <div>
            <label className="text-sm font-medium">Thumbnails</label>
            <label className="mt-2 flex min-h-[100px] cursor-pointer items-center justify-center border-2 border-border-gray border-dashed rounded">
              {thumbPreviews.length ? (
                <div className="flex gap-2">
                  {thumbPreviews.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      className="h-20 w-20 rounded object-cover"
                    />
                  ))}
                </div>
              ) : (
                <Upload />
              )}
              <input
                hidden
                multiple
                type="file"
                accept="image/*"
                onChange={handleThumbChange}
              />
            </label>
          </div>

          {/* Extra Images */}
          <div>
            <label className="text-sm font-medium">Extra Images (max 4)</label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {imagePreviews.map((src, i) => (
                <div key={i} className="relative">
                  <img src={src} className="h-20 w-20 rounded object-cover" />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 bg-custom-red text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {imagePreviews.length < 4 && (
                <label className="h-20 w-20 border-2 border-dashed border-border-gray flex items-center justify-center cursor-pointer rounded">
                  <Upload size={18} />
                  <input
                    hidden
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImagesAdd}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <div className="border border-border-gray">
              <RichTextArea
                height={160}
                defaultValue={description}
                onChange={setDescription}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-border-gray px-6 py-4">
          <button
            onClick={onClose}
            className="border border-border-gray px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            disabled={!isChanged}
            onClick={handleUpdate}
            className={`px-5 py-2 rounded text-white ${
              isChanged ? 'bg-active-nav' : 'bg-disable-gray cursor-not-allowed'
            }`}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashGalleryUpdateModal;
