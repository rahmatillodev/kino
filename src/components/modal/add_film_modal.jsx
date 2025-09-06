import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AddFilmModal({ isOpen, onOpenChange, onSubmit, isEdit, filmData, contentType = 'film' }) {
  const [formData, setFormData] = React.useState({
    name: '',
    year: '',
    description: '',
    image: '',
    imdbLink: '',
    nameUz: '',
    country: '',
    duration: '',
    allEpisodes: '',
    episodes: ''
  });

  useEffect(() => {
    if (isEdit && filmData) {
      setFormData(filmData); 
    } else {
      setFormData({
        name: '',
        year: '',
        description: '',
        image: '',
        imdbLink: '',
        nameUz: '',
        country: '',
        duration: '',
        allEpisodes: '',
        episodes: '',
      });
    }
  }, [isEdit, filmData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {isEdit ? `Edit ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}` : `Add ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            {isEdit ? `Edit the ${contentType} details below.` : `Fill in the details for the new ${contentType}.`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Film Name"
          />
          <Input
            name="nameUz"
            value={formData.nameUz}
            onChange={handleInputChange}
            placeholder="Film Name (Uzbek)"
          />
          <Input
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            placeholder="Year"
            type="number"
          />
          <Input
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
          <Input
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
          />
          <Input
            name="imdbLink"
            value={formData.imdbLink}
            onChange={handleInputChange}
            placeholder="IMDb Link"
          />
          <Input
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Country"
          />
          {(contentType === 'film' || contentType === 'cartoon') && (
          <Input
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="Duration"
            type="number"
          />
          )}
          {(contentType === 'anime' || contentType === 'series') && (
            <Input
              name="allEpisodes"
              value={formData.allEpisodes}
              onChange={handleInputChange}
              placeholder="All Episodes"
              type="number"
            />
          )}
          {(contentType === 'anime' || contentType === 'series') && (
            <Input
              name="episodes"
              value={formData.episodes}
              onChange={handleInputChange}
              placeholder="Number of Episodes"
              type="number"
            />
          )}

          <DialogFooter>
            <Button type="submit" className="bg-blue-500 text-white">
              {isEdit ? 'Save Changes' : `Add ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`}
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
