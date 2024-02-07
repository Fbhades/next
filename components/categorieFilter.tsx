interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryClick,
}) => {
  return (
    <div className="mb-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 mr-2 border border-gray-300 rounded-md ${
            selectedCategory === category
              ? 'bg-indigo-500 text-white'
              : 'bg-white text-gray-700'
          }`}
          onClick={() => onCategoryClick(category)}
        >
          {category}
        </button>
      ))}
      <button
        className={`px-4 py-2 mr-2 border border-gray-300 rounded-md ${
          !selectedCategory
            ? 'bg-indigo-500 text-white'
            : 'bg-white text-gray-700'
        }`}
        onClick={() => onCategoryClick('')}
      >
        All
      </button>
    </div>
  );
};

export default CategoryFilter;