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
}: ConfigurationInputType) => {
  const { register } = useFormContext();
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
          <input id="input-file" type="file" />
        </label>
      );
    default:
      return <input id={id} type="text" />;
  }
};
