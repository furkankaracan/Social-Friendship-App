using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>().ForMember(dest => dest.PhotoUrl,
            opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.BirthDate.CalculateAge()))
            .ForMember(dest => dest.Likes, opt => opt.MapFrom(src => src.Likers.FirstOrDefault()));
            CreateMap<User, UserForDetailedDto>().ForMember(dest => dest.PhotoUrl,
            opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.BirthDate.CalculateAge()));
            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreatingDto, Photo>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDto>()
                .ForMember(prm => prm.SenderPhotoUrl, opt => opt.MapFrom(p => p.Sender.Photos.FirstOrDefault(u => u.IsMain).Url))
                .ForMember(prm => prm.RecipientPhotoUrl, opt => opt.MapFrom(p => p.Recipient.Photos.FirstOrDefault(u => u.IsMain).Url));
        }
    }
}