import { useFormContext } from 'react-hook-form';
import { ConfigurationInputType } from 'features/nodeEditor/types';
import { emailPattern } from 'common/constants';
import uploadIcon from 'assets/icons/upload.svg';

export const DynamicControl = ({
  type,
  fieldName,
  config,
  id,
  placeholder,
  setImageData,
}: ConfigurationInputType) => {
  const { register } = useFormContext();
  const readFile = (e: any) => {
    if (e.target.files && e.target.files.length
    && (e.target.files[0].type === 'image/png'
    || e.target.files[0].type === 'image/jpeg'
    || e.target.files[0].type === 'image/gif'
    || e.target.files[0].type === 'image/svg+xml')) {
      const FR = new FileReader();
      FR.readAsDataURL(e.target.files[0]);
      FR.onload = () => {
        if (FR.result) {
          setImageData(FR.result.toString());
        }
      };
    }
  };
  switch (type) {
    case 'text':
      return (
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          {...register(fieldName, config)}
        />
      );
    case 'url':
      return (
        <input
          id={id}
          type="url"
          {...register(fieldName, {
            required: 'Field is required',
            pattern: {
              value: emailPattern,
              message: 'Enter valid link',
            },
          })}
        />
      );
    case 'image-upload':
      return (
        <label htmlFor="input-file" className="file-upload">
          <span className="upload-icon">
            <img src={uploadIcon} alt="upload" />
          </span>
          <span>Click to Upload</span>
          <input id="input-file" type="file" onChange={readFile} />
        </label>
      );
    default:
      return <input id={id} type="text" />;
  }
};
