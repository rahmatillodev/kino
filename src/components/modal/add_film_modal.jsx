import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AddFilmModal({ isOpen, onOpenChange, onSubmit, isEdit, filmData }) {
  const [formData, setFormData] = React.useState({
    name: '',
    year: '',
    description: '',
    image: '',
    imdbLink: '',
    nameUz: '',
    studio: '',
    country: '',
    duration: ''
  });

  useEffect(() => {
    if (isEdit && filmData) {
      setFormData(filmData); 
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
          <DialogTitle className="text-2xl font-semibold">{isEdit ? 'Edit Film' : 'Add Film'}</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            {isEdit ? 'Edit the film details below.' : 'Fill in the details for the new film.'}
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
            name="studio"
            value={formData.studio}
            onChange={handleInputChange}
            placeholder="Studio"
          />
          <Input
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Country"
          />
          <Input
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="Duration"
            type="number"
          />

          <DialogFooter>
            <Button type="submit" className="bg-blue-500 text-white">
              {isEdit ? 'Save Changes' : 'Add Film'}
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
