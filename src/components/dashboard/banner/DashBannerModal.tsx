'use client';
import { Upload } from 'lucide-react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

// Client-side Banner payload (includes imageFile)
export interface BannerPayload {
  title: string;
  description: string;
  status: 'active' | 'inactive';
  buttonText: string;
  buttonLink: string;
  imageFile: File; // only client-side
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: BannerPayload) => void;
}

const DashBannerModal = ({ open, onClose, onSubmit }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      buttonText: '',
      buttonLink: '',
      image: null as File | null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      buttonText: Yup.string().required('Button text is required'),
      buttonLink: Yup.string().required('Button link is required'),
      image: Yup.mixed().required('Banner image is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      if (!values.image) return;

      onSubmit({
        title: values.title,
        description: values.description,
        buttonText: values.buttonText,
        buttonLink: values.buttonLink,
        status: 'active',
        imageFile: values.image, // pass actual file
      });

      resetForm();
      setPreview(null);
      onClose();
    },
  });

  if (!open) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    formik.setFieldValue('image', file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />
      <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-gray px-6 py-4">
          <h2 className="text-lg font-semibold">Create New Banner</h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4 px-6 py-6">
            {/* Title */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Title <span className="text-custom-red">*</span>
              </label>
              <input
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border border-border-gray px-4 py-2 text-sm"
              />
              {formik.touched.title && formik.errors.title && (
                <p className="mt-1 text-xs text-custom-red">
                  {formik.errors.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Description <span className="text-custom-red">*</span>
              </label>
              <textarea
                name="description"
                rows={3}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border border-border-gray px-4 py-2 text-sm"
              />
              {formik.touched.description && formik.errors.description && (
                <p className="mt-1 text-xs text-custom-red">
                  {formik.errors.description}
                </p>
              )}
            </div>

            {/* Button Text */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Button Text <span className="text-custom-red">*</span>
              </label>
              <input
                name="buttonText"
                value={formik.values.buttonText}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border border-border-gray px-4 py-2 text-sm"
              />
              {formik.touched.buttonText && formik.errors.buttonText && (
                <p className="mt-1 text-xs text-custom-red">
                  {formik.errors.buttonText}
                </p>
              )}
            </div>

            {/* Button Link */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Button Link <span className="text-custom-red">*</span>
              </label>
              <input
                name="buttonLink"
                placeholder="e.g. shop-now"
                value={formik.values.buttonLink}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border border-border-gray px-4 py-2 text-sm"
              />
              {formik.touched.buttonLink && formik.errors.buttonLink && (
                <p className="mt-1 text-xs text-custom-red">
                  {formik.errors.buttonLink}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Banner Image <span className="text-custom-red">*</span>
              </label>
              <label className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-border-gray bg-gray">
                {preview ? (
                  <img
                    src={preview}
                    className="h-full w-full rounded-md object-cover"
                    alt="preview"
                  />
                ) : (
                  <>
                    <Upload className='mb-4'/>
                    <p className="font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG/JPG/JPEG</p>
                  </>
                )}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              {formik.touched.image && formik.errors.image && (
                <p className="mt-1 text-xs text-custom-red">
                  {formik.errors.image as string}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-border-gray px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-border-gray px-5 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-active-nav px-6 py-2 text-sm text-white"
            >
              Submit Banner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashBannerModal;
