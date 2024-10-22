import { Test, TestingModule } from '@nestjs/testing';
import { FileCreateService } from './file/create.service';
import { MemberService } from './member/member.service';
import { SignupService } from './signup.service';
import mockValues from '../../test/mockValues';

describe('SignupService', () => {
  let service: SignupService;
  let memberService: MemberService;
  let fileCreateService: FileCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignupService,
        {
          provide: MemberService,
          useValue: {
            createMember: jest.fn(),
          },
        },
        {
          provide: FileCreateService,
          useValue: {
            createRootFile: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SignupService>(SignupService);
    memberService = module.get<MemberService>(MemberService);
    fileCreateService = module.get<FileCreateService>(FileCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new member and root file', async () => {
    memberService.createMember = jest.fn().mockResolvedValue(mockValues.member);
    fileCreateService.createBaseFiles = jest.fn().mockResolvedValue({
      root: mockValues.root,
      home: mockValues.container,
      trash: mockValues.trash,
    });
    const result = await service.signup(mockValues.member.uuid_key);

    expect(result).toBeDefined();
    expect(result).toEqual(mockValues.member);
  });
});
